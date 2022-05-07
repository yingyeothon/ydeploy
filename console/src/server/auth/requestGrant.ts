import Authorization from "./Authorization";

export default async function requestGrant(): Promise<Authorization> {
  return fetch(`/api/auth/grant`, {
    method: "POST",
  }).then((r) => r.json());
}
