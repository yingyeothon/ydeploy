import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import Project from "./Project";
import insertDBProject from "../../repository/project/insertDBProject";
import mapProjectToModel from "./mapProjectToModel";

type Payload = Pick<Project, "codename" | "name" | "description">;

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Project
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const requestBody = JSON.parse(event.body ?? "{}") as Payload;
  if (!requestBody.codename || !requestBody.name) {
    return BadRequest;
  }

  const dbProject = await insertDBProject({
    member_id: memberId,
    codename: requestBody.codename,
    name: requestBody.name,
    description: requestBody.description ?? null,
  });
  return mapProjectToModel(dbProject);
};
