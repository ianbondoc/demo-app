import Keycloak from "keycloak-js";

const keycloak = Keycloak("/keycloak.json");

const initKeycloak = (onAuthenticateCallback: () => void) => {
  keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated");
      } else {
        console.log("user is authenticated");
      }
      onAuthenticateCallback();
    })
    .catch(console.error);
};

const isLoggedIn = () => keycloak.authenticated;
const login = () => keycloak.login();
const logout = () => keycloak.logout();

const getUsername = () => keycloak.tokenParsed?.preferred_username;

export const UserService = {
  initKeycloak,
  isLoggedIn,
  login,
  logout,
  getUsername,
};
