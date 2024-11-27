import { RootState } from "@app/index";

import { formQueriesAdapter } from "../slice/formQueriesSlice";

export const formQueriesSelectors = formQueriesAdapter.getSelectors<RootState>(
  (state: RootState) => state.formQueries
);

export const getFormQueriesLoading = (state: RootState) =>
  state.formQueries.loading;

export const getFormQueriesPagination = (state: RootState) =>
  state.formQueries.pagination;

export const getFormQueriesDetail = (state: RootState) =>
  state.formQueries.formDetail;
