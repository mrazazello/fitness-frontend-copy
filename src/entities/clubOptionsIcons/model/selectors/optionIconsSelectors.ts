import type { RootState } from "@app/index";

import { optionIconsAdapter } from "../slice/optionIconsSlice";

export const optionIconsSelectors = optionIconsAdapter.getSelectors<RootState>(
  (state: RootState) => state.optionIcons
);
