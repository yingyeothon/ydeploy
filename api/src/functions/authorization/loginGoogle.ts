import { cookieName, oneWeekMillis, secretKey } from "./constants";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { createSigner } from "fast-jwt";
import findOrInsertDBMemberId from "../../repository/member/findOrInsertDBMemberId";
import https from "https";

export const signToken: (payload: any) => any = createSigner({
  key: secretKey,
  expiresIn: oneWeekMillis,
});

export const handle: APIGatewayProxyHandlerV2 = async (event) => {
  const { token } = event.queryStringParameters ?? {};
  if (!token) {
    return { statusCode: 400 };
  }

  const response = await fetchGoogleUserinfo(token);
  if (response.error) {
    return { statusCode: 401 };
  }
  const { email } = response;
  const memberId = await findOrInsertDBMemberId(email);
  const jwt = signToken({ memberId, email });
  const expires = new Date(Date.now() + oneWeekMillis).toUTCString();
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `${cookieName}=${jwt}; Path=/; Expires=${expires}; Secure; HttpOnly`,
    },
  };
};

async function fetchGoogleUserinfo(
  token: string
): Promise<{ email: string; error?: string }> {
  const response = await new Promise<string>((resolve, reject) =>
    https
      .request(
        {
          hostname: "www.googleapis.com",
          path: "/oauth2/v3/userinfo",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          let data = "";
          response
            .on("data", (chunk) => (data += chunk))
            .on("error", reject)
            .on("close", () => resolve(data));
        }
      )
      .on("error", reject)
      .end()
  );
  return JSON.parse(response);
}
