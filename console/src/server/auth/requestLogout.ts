export default async function requestLogout(): Promise<void> {
  await fetch(`/api/auth/logout`, {
    method: "POST",
  });
}
