import type { RootState } from "@app/index";

import { slidersAdapter } from "../slice/slidersSlice";

export const slidersSelectors = slidersAdapter.getSelectors<RootState>(
  (state: RootState) => state.sliders
);

export const getSlidersLoading = (state: RootState) => state.sliders.loading;

export const getSlidersPagination = (state: RootState) =>
  state.sliders.pagination;

export const getSliderDetail = (state: RootState) => state.sliders.sliderDetail;
