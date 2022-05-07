import { BadRequest, NotFound } from "../../infra/http/responses";

import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import Project from "./Project";
import findDBProject from "../../repository/project/findDBProject";
import mapProjectToModel from "./mapProjectToModel";
import readProjectIdFromEvent from "./readProjectIdFromEvent";
import updateDBProject from "../../repository/project/updateDBProject";

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
  const projectId = readProjectIdFromEvent(event);
  if (projectId <= 0) {
    return BadRequest;
  }
  const oldDbProject = await findDBProject(projectId);
  if (!oldDbProject) {
    return NotFound;
  }
  if (
    oldDbProject.member_id !== memberId ||
    oldDbProject.codename !== requestBody.codename
  ) {
    return BadRequest;
  }

  const dbProject = await updateDBProject({
    member_id: memberId,
    project_id: projectId,
    codename: requestBody.codename,
    name: requestBody.name ?? oldDbProject.name,
    description: requestBody.description ?? oldDbProject.description,
  });
  return mapProjectToModel(dbProject);
};
