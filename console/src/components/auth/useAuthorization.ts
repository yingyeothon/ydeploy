import Authorization from "../../server/auth/Authorization";
import AuthorizationContext from "./AuthorizationContext";
import React from "react";

export default function useAuthorization(): Authorization {
  return React.useContext(AuthorizationContext);
}
