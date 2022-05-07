import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import deleteDBProject from "../../repository/project/deleteDBProject";
import readProjectIdFromEvent from "./readProjectIdFromEvent";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  boolean
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const projectId = readProjectIdFromEvent(event);
  if (projectId <= 0) {
    return BadRequest;
  }
  return await deleteDBProject(memberId, projectId);
};
