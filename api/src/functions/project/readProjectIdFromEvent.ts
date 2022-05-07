import { APIGatewayProxyEventV2 } from "aws-lambda";
import readIntPathParameter from "../../infra/http/readIntPathParameter";

export default function readProjectIdFromEvent(
  event: APIGatewayProxyEventV2
): number {
  return readIntPathParameter(event, "projectId");
}
