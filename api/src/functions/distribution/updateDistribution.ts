import { BadRequest, NotFound } from "../../infra/http/responses";

import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import Distribution from "./Distribution";
import findDBDistribution from "../../repository/distribution/findDBDistribution";
import mapDistributionToModel from "./mapDistributionToModel";
import readDistributionIdFromEvent from "./readDistributionIdFromEvent";
import updateDBDistribution from "../../repository/distribution/updateDBDistribution";

type Payload = Pick<Distribution, "version" | "name" | "description">;

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Distribution
> = async (event) => {
  const { memberId } = event.requestContext.authorizer.lambda;
  const requestBody = JSON.parse(event.body ?? "{}") as Payload;
  if (!requestBody.version || !requestBody.name) {
    return BadRequest;
  }
  const distributionId = readDistributionIdFromEvent(event);
  if (distributionId <= 0) {
    return BadRequest;
  }
  const oldDbDistribution = await findDBDistribution(distributionId);
  if (!oldDbDistribution) {
    return NotFound;
  }
  if (oldDbDistribution.member_id !== memberId) {
    return BadRequest;
  }

  const dbDistribution = await updateDBDistribution({
    distribution_id: distributionId,
    member_id: memberId,
    version: requestBody.version,
    name: requestBody.name ?? oldDbDistribution.name,
    description: requestBody.description ?? oldDbDistribution.description,
  });
  return mapDistributionToModel(dbDistribution);
};
