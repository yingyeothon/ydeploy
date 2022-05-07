import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { cookieName } from "./constants";

export const handle: APIGatewayProxyHandlerV2 = async () => {
  const epoch = new Date(0).toUTCString();
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `${cookieName}=; Path=/; Expires=${epoch}`,
    },
  };
};
