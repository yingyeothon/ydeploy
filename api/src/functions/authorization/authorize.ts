import { APIGatewayRequestSimpleAuthorizerHandlerV2WithContext } from "aws-lambda";
import Authorization from "./Authorization";
import parseTokenFromCookie from "./parseTokenFromCookie";
import verifyToken from "./verifyToken";

export const handle: APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<
  Authorization
> = async (event) => {
  try {
    const token = parseTokenFromCookie(event.cookies ?? []);
    const context = verifyToken(token) as Authorization;
    return { isAuthorized: true, context };
  } catch (error) {
    return { isAuthorized: false, context: { memberId: -1, email: "" } };
  }
};
