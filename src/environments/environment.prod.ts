import keycloakConfigProd from "./keycloak.config.prod";

export const environment = {
  production: true,
  baseURL:"billing/api",
  keycloak: keycloakConfigProd,
};
