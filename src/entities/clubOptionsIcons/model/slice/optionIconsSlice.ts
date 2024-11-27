import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { IIconItem } from "../types/options";
import { fetchOptionIcons } from "../service/fetchOptionIcons";

export interface IOptionIconsSchema extends IEntitiesState {
  entities?: IIconItem[];
}

const initialState: IOptionIconsSchema = {
  loading: "idle"
};

export const optionIconsAdapter = createEntityAdapter({
  selectId: (item: IIconItem) => item
});

const optionIconsSlice = createSlice({
  name: "optionIcons",
  initialState: optionIconsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptionIcons.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchOptionIcons.fulfilled, (state, action) => {
        optionIconsAdapter.addMany(state, action.payload.icons.items);
        state.loading = "idle";
      })
      .addCase(fetchOptionIcons.rejected, (state) => {
        state.loading = "failed";
      });
  }
});

export const { actions: optionIconsActions, reducer: optionIconsReducer } =
  optionIconsSlice;
