import {jwtDecode} from "jwt-decode";
import {getAuth0Client, getTokenSilently} from "./auth0";

export async function login() {
  const auth0 = await getAuth0Client();
  const isAuthenticated = await auth0.isAuthenticated();
  const baseOptions = {
    authorizationParams: {
      transaction_input: JSON.stringify({
        othentFunction: "KMS",
      }),
      redirect_uri: window.location.origin,
    },
  };

  const loginAndGetDecodedJWT = async (options) => {
    await auth0.loginWithPopup(options);
    const authParams = {
      transaction_input: JSON.stringify({othentFunction: "KMS"}),
    };
    console.log('getTokenSilently')

    const accessToken = await getTokenSilently(auth0, authParams);
    console.log('accessToken', accessToken)

    const jwtObj = jwtDecode(accessToken.id_token)

    console.log('localStorage.setItem("id_token')
    localStorage.setItem("id_token", accessToken.id_token);

    return {encoded: accessToken.id_token, decoded: jwtObj};
  };

  const processDecodedJWT = async (decoded_JWT) => {
    const fieldsToDelete = [
      "nonce",
      "sid",
      "aud",
      "iss",
      "iat",
      "exp",
      "updated_at",
    ];
    fieldsToDelete.forEach(
      (field) => delete decoded_JWT[field],
    )
    return decoded_JWT;
  }

  console.log('  if (isAuthenticated) {\n')
  if (isAuthenticated) {
    const {decoded} = await loginAndGetDecodedJWT(baseOptions);
    return processDecodedJWT(decoded);
  } else {
    const {decoded} = await loginAndGetDecodedJWT(baseOptions);
    return processDecodedJWT(decoded);
  }
}
