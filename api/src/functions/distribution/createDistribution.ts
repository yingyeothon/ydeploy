import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import Distribution from "./Distribution";
import { S3 } from "aws-sdk";
import filenamify from "filenamify";
import findDBProject from "../../repository/project/findDBProject";
import insertDBDistribution from "../../repository/distribution/insertDBDistribution";
import mapDistributionToModel from "./mapDistributionToModel";
import readProjectIdFromEvent from "../project/readProjectIdFromEvent";

type Payload = Pick<Distribution, "version" | "name" | "description">;
const s3 = new S3();

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Distribution & { uploadURL: string }
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const requestBody = JSON.parse(event.body ?? "{}") as Payload;
  if (!requestBody.version || !requestBody.name) {
    return BadRequest;
  }
  const projectId = readProjectIdFromEvent(event);
  if (projectId <= 0) {
    return BadRequest;
  }

  const dbProject = await findDBProject(projectId);
  if (!dbProject) {
    return BadRequest;
  }
  const objectKey = [
    filenamify(dbProject.codename),
    filenamify(requestBody.version),
    filenamify(requestBody.name),
  ].join("/");
  const uploadURL = await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.DIST_BUCKET!,
    Key: objectKey,
    Expires: 5 * 60,
  });

  const dbDistribution = await insertDBDistribution({
    member_id: memberId,
    project_id: projectId,
    version: requestBody.version,
    name: requestBody.name,
    description: requestBody.description ?? null,
    upload_path: `https://${process.env.DIST_BUCKET}/${objectKey}`,
  });
  return { ...mapDistributionToModel(dbDistribution), uploadURL };
};
