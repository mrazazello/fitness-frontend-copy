import type { RootState } from "@app/index";

export const getClubOptions = (state: RootState) => state.clubOptions.options;

export const getClubOptionsLoading = (state: RootState) =>
  state.clubOptions.loading;
