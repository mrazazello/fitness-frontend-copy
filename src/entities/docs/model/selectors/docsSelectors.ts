import { RootState } from "@app/index";

import { docsAdapter } from "../slice/docsSlice";

export const docsSelectors = docsAdapter.getSelectors<RootState>(
  (state: RootState) => state.docs
);

export const getDocsLoading = (state: RootState) => state.docs.loading;

export const getDocDetail = (state: RootState) => state.docs.docDetail;
