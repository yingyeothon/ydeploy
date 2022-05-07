import { createVerifier } from "fast-jwt";
import { secretKey } from "./constants";

const verifyToken: (token: string) => any = createVerifier({
  key: secretKey,
});

export default verifyToken;
