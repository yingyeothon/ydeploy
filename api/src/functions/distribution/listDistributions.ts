import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import Distribution from "./Distribution";
import findDBDistributions from "../../repository/distribution/findDBDistributions";
import mapDistributionToModel from "./mapDistributionToModel";
import readProjectIdFromEvent from "../project/readProjectIdFromEvent";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Distribution[]
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const projectId = readProjectIdFromEvent(event);
  if (projectId <= 0) {
    return BadRequest;
  }

  const dbDistributions = await findDBDistributions(memberId, projectId);
  return dbDistributions.map((each) => mapDistributionToModel(each));
};
