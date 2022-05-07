import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";

import requestLogin from "../../server/auth/requestLogin";
import requestLogout from "../../server/auth/requestLogout";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

export default function LogInOutButton({ logged }: { logged: boolean }) {
  if (!logged) {
    return (
      <GoogleLogin
        clientId={googleClientId}
        fetchBasicProfile={false}
        onSuccess={(response) => processLogin(response as GoogleLoginResponse)}
        onFailure={(failure) => alert(failure.error)}
      />
    );
  }

  return (
    <GoogleLogout clientId={googleClientId} onLogoutSuccess={processLogout} />
  );
}

function processLogin(response: GoogleLoginResponse) {
  return requestLogin(response.accessToken).then(() =>
    window.location.reload()
  );
}

function processLogout() {
  return requestLogout().then(() => window.location.reload());
}
