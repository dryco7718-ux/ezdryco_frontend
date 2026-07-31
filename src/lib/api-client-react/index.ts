export * from "./generated/api";
export * from "./generated/api.schemas";
export {
  setBaseUrl,
  setAuthTokenGetter,
  setRefreshHandler,
  setAuthFailureHandler,
  customFetch,
} from "./custom-fetch";
export type {
  AuthTokenGetter,
  RefreshHandler,
  AuthFailureHandler,
} from "./custom-fetch";
