import { RootState } from "@app/index";

import { prorgammsAdapter } from "../slice/programmsSlice";

export const programmsSelectors = prorgammsAdapter.getSelectors<RootState>(
  (state: RootState) => state.programms
);

export const getProggramsLoading = (state: RootState) =>
  state.programms.loading;
