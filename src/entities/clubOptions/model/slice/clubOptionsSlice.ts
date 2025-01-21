import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { createClubOption } from "../service/createClubOption";
import { deleteOption } from "../service/deleteOption";
import { editOption } from "../service/editOption";
import { fetchClubOptions } from "../service/fetchClubOptions";
import type { IClubOptionsItem } from "../types/clubOptions";

export interface IClubOptionsSchema extends IEntitiesState {
  options: IClubOptionsItem[] | null;
}

const initialState: IClubOptionsSchema = {
  loading: "idle",
  options: null
};

export const clubsOptionsAdapter = createEntityAdapter({
  selectId: (item: IClubOptionsItem) => item.code
});

const clubOptionsSlice = createSlice({
  name: "clubsOptions",
  initialState: clubsOptionsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetching options
      .addCase(fetchClubOptions.fulfilled, (state, action) => {
        state.options = action.payload.options.items;
        state.loading = "idle";
      })
      .addCase(fetchClubOptions.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClubOptions.pending, (state) => {
        state.loading = "loading";
      })
      // add option
      .addCase(createClubOption.fulfilled, (state, action) => {
        const newOption = {
          code: action.payload.code,
          icon: action.meta.arg.icon,
          name: action.meta.arg.name
        };
        state.options?.push(newOption);
        state.loading = "idle";
      })
      .addCase(createClubOption.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createClubOption.pending, (state) => {
        state.loading = "loading";
      })
      // edit option
      .addCase(editOption.fulfilled, (state, action) => {
        if (state.options) {
          const index = state.options.findIndex(
            (item) => item.code === action.meta.arg.code
          );
          state.options[index].name = action.meta.arg.name;
          state.options[index].icon = action.meta.arg.icon;
        }
        state.loading = "idle";
      })
      .addCase(editOption.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editOption.pending, (state) => {
        state.loading = "loading";
      })
      // delete option
      .addCase(deleteOption.fulfilled, (state, action) => {
        if (state.options) {
          const index = state.options.findIndex(
            (item) => item.code === action.meta.arg
          );
          state.options.splice(index, 1);
        }
        state.loading = "idle";
      })
      .addCase(deleteOption.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteOption.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: clubOptionsActions, reducer: clubOptionsReducer } =
  clubOptionsSlice;
