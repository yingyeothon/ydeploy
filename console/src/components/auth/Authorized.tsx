import AuthorizationContext from "./AuthorizationContext";
import React from "react";

export default function Authorized({
  children,
}: {
  children: React.ReactNode;
}) {
  const { memberId } = React.useContext(AuthorizationContext);
  return memberId > 0 ? <>{children}</> : <></>;
}
