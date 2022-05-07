import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import Authorization from "./Authorization";
import parseTokenFromCookie from "./parseTokenFromCookie";
import verifyToken from "./verifyToken";

export const handle: APIGatewayProxyHandlerV2<Authorization> = async (
  event
) => {
  try {
    return verifyToken(parseTokenFromCookie(event.cookies ?? []));
  } catch (error) {
    return { memberId: -1, email: "" };
  }
};
