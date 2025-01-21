import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { fetchformQuerie } from "../service/fetchformQuerie";
import { fetchformQueries } from "../service/fetchformQueries";
import type {
  IFormQuerieDetail,
  IFormQueriesListItem
} from "../types/formQueries";

export interface IFormQueriesSchema extends IEntitiesState {
  entities?: IFormQueriesListItem[];
  formDetail?: IFormQuerieDetail;
}

const initialState: IFormQueriesSchema = {
  loading: "idle"
};

export const formQueriesAdapter = createEntityAdapter({
  selectId: (item: IFormQueriesListItem) => item.code
});

const formQueriesSlice = createSlice({
  name: "formQueries",
  initialState: formQueriesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch forms
      .addCase(fetchformQueries.fulfilled, (state, action) => {
        formQueriesAdapter.removeAll(state);
        formQueriesAdapter.addMany(state, action.payload.clientQueries.items);
        state.pagination = action.payload.clientQueries.pagination;
        state.loading = "idle";
      })
      .addCase(fetchformQueries.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchformQueries.pending, (state) => {
        state.loading = "loading";
      })
      // fetch detail form
      .addCase(fetchformQuerie.fulfilled, (state, action) => {
        state.formDetail = action.payload.clientQuery;
        state.loading = "idle";
      })
      .addCase(fetchformQuerie.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchformQuerie.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: formQuerieActions, reducer: formQuerieReducer } =
  formQueriesSlice;
