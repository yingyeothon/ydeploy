import Authorization, {
  invalidAuthorization,
} from "../../server/auth/Authorization";

import React from "react";

const AuthorizationContext =
  React.createContext<Authorization>(invalidAuthorization);

export default AuthorizationContext;
