import type { RootState } from "@app/index";

import { promocodesAdapter } from "../slice/promocodesSlice";

export const promocodesSelectors = promocodesAdapter.getSelectors<RootState>(
  (state: RootState) => state.promocodes
);

export const getPromocodesLoading = (state: RootState) =>
  state.promocodes.loading;

export const getPromocodesDetail = (state: RootState) =>
  state.promocodes.promocodeDetail;

export const getPromocodesPagination = (state: RootState) =>
  state.promocodes.pagination;
