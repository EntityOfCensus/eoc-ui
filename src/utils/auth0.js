import {
  createAuth0Client
} from "@auth0/auth0-spa-js";

export const getAuth0Client = () =>
  createAuth0Client({
    domain: "auth.othent.io",
    clientId: "uXkRmJoIa0NfzYgYEDAgj6Rss4wR1tIc",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });

export function getTokenSilently(auth0, authParams) {
  return auth0.getTokenSilently({
    detailedResponse: true,
    authorizationParams: authParams,
    cacheMode: "off",
  });
}


