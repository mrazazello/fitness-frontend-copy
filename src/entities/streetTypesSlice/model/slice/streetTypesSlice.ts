import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { IStreetTypeItem } from "../types/streetTypes";
import { fetchstreetTypes } from "../service/fetchstreetTypes";

export interface IOptionIconsSchema extends IEntitiesState {
  entities?: IStreetTypeItem[];
}

const initialState: IOptionIconsSchema = {
  loading: "idle"
};

export const streetTypesAdapter = createEntityAdapter({
  selectId: (item: IStreetTypeItem) => item.name
});

const streetTypesSlice = createSlice({
  name: "streetTypes",
  initialState: streetTypesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchstreetTypes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchstreetTypes.fulfilled, (state, action) => {
        streetTypesAdapter.addMany(state, action.payload.types.items);
        state.loading = "idle";
      })
      .addCase(fetchstreetTypes.rejected, (state) => {
        state.loading = "failed";
      });
  }
});

export const { actions: streetTypesActions, reducer: streetTypesReducer } =
  streetTypesSlice;
