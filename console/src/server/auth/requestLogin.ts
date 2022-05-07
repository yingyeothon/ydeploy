export default async function requestLogin(accessToken: string): Promise<void> {
  await fetch(`/api/auth/login-google?token=${accessToken}`, {
    method: "POST",
  });
}
