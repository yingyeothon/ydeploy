import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import deleteDBDistribution from "../../repository/distribution/deleteDBDistribution";
import readDistributionIdFromEvent from "./readDistributionIdFromEvent";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  boolean
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const distributionId = readDistributionIdFromEvent(event);
  if (distributionId <= 0) {
    return BadRequest;
  }
  return await deleteDBDistribution(memberId, distributionId);
};
