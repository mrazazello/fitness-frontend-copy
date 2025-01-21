import type { RootState } from "@app/index";

import { coachsAdapter } from "../slice/coachsSlice";

export const coachsSelectors = coachsAdapter.getSelectors<RootState>(
  (state: RootState) => state.coachs
);

export const getCoachsLoading = (state: RootState) => state.coachs.loading;

export const getCoachDetail = (state: RootState) => state.coachs.coachDetail;

export const getCoachFilters = (state: RootState) => state.coachs.filters;

export const getCoachSorter = (state: RootState) => state.coachs.sorter;
