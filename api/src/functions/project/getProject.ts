import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import Project from "./Project";
import findDBProject from "../../repository/project/findDBProject";
import mapProjectToModel from "./mapProjectToModel";
import readProjectIdFromEvent from "./readProjectIdFromEvent";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Project | null
> = async (event) => {
  const projectId = readProjectIdFromEvent(event);
  if (projectId <= 0) {
    return BadRequest;
  }
  const dbProject = await findDBProject(projectId);
  if (!dbProject) {
    return null;
  }
  return mapProjectToModel(dbProject);
};
