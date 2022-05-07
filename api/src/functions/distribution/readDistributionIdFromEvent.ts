import { APIGatewayProxyEventV2 } from "aws-lambda";
import readIntPathParameter from "../../infra/http/readIntPathParameter";

export default function readDistributionIdFromEvent(
  event: APIGatewayProxyEventV2
): number {
  return readIntPathParameter(event, "distributionId");
}
