import { APIGatewayProxyEventV2 } from "aws-lambda";

export default function readIntPathParameter(
  event: APIGatewayProxyEventV2,
  name: string
): number {
  const idParam = (event.pathParameters ?? {})[name];
  if (!idParam) {
    return -1;
  }
  if (/^[0-9]+$/.test(idParam)) {
    return +idParam;
  }
  return -1;
}
