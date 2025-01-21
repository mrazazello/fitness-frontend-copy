import type { RootState } from "@app/index";

import { streetTypesAdapter } from "../slice/streetTypesSlice";

export const streetTypesSelectors = streetTypesAdapter.getSelectors<RootState>(
  (state: RootState) => state.streetTypes
);
