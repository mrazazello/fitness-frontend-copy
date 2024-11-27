import { RootState } from "@app/index";

import { offersAdapter } from "../slice/offersSlice";

export const offersSelectors = offersAdapter.getSelectors<RootState>(
  (state: RootState) => state.offers
);

export const getOffersLoading = (state: RootState) => state.offers.loading;

export const getOfferDetail = (state: RootState) => state.offers.offerDetail;

export const getOffersPagination = (state: RootState) =>
  state.offers.pagination;
