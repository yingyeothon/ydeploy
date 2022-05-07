import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import Project from "./Project";
import findDBProjects from "../../repository/project/findDBProjects";
import mapProjectToModel from "./mapProjectToModel";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Project[]
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const dbProjects = await findDBProjects(memberId);
  return dbProjects.map((each) => mapProjectToModel(each));
};
