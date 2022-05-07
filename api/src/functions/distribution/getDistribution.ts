import { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "aws-lambda";
import Authorization from "../authorization/Authorization";
import { BadRequest } from "../../infra/http/responses";
import Distribution from "./Distribution";
import findDBDistribution from "../../repository/distribution/findDBDistribution";
import mapDistributionToModel from "./mapDistributionToModel";
import readDistributionIdFromEvent from "./readDistributionIdFromEvent";

export const handle: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  Authorization,
  Distribution | null
> = async (event) => {
  const distributionId = readDistributionIdFromEvent(event);
  if (distributionId <= 0) {
    return BadRequest;
  }
  const dbDistribution = await findDBDistribution(distributionId);
  if (!dbDistribution) {
    return null;
  }
  return mapDistributionToModel(dbDistribution);
};
