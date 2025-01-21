import type { RootState } from "@app/index";

export const getAccessToken = (state: RootState) => state.auth.accessToken;

export const getAuthIsLoading = (state: RootState) => state.auth.loading;
