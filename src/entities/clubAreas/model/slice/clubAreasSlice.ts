import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { IAllAreaItem, IClubAreasItem } from "../types/clubAreas";
import { fetchClubAreas } from "../service/fetchClubAreas";
import { fetchAllAreas } from "../service/fetchAllAreas";
import { createClubArea } from "../service/createClubArea";
import { deleteArea } from "../service/deleteArea";
import { editArea } from "../service/editArea";

export interface IClubAreasSchema extends IEntitiesState {
  clubAreas: IClubAreasItem[];
  clubAllAreas: IAllAreaItem[];
}

const initialState: IClubAreasSchema = {
  loading: "idle",
  clubAreas: [],
  clubAllAreas: []
};

export const clubsAreasAdapter = createEntityAdapter({
  selectId: (item: IClubAreasItem) => item.code
});

const clubAreasSlice = createSlice({
  name: "clubsAreas",
  initialState: clubsAreasAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetching areas (rooms)
      .addCase(fetchClubAreas.fulfilled, (state, action) => {
        state.clubAreas = action.payload.areas.items;
        state.loading = "idle";
      })
      .addCase(fetchClubAreas.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClubAreas.pending, (state) => {
        state.loading = "loading";
      })
      // fetching all areas (rooms)
      .addCase(fetchAllAreas.fulfilled, (state, action) => {
        state.clubAllAreas = action.payload.areas.items;
        state.loading = "idle";
      })
      .addCase(fetchAllAreas.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchAllAreas.pending, (state) => {
        state.loading = "loading";
      })
      // create area for club
      .addCase(createClubArea.fulfilled, (state, action) => {
        const createdArea: IClubAreasItem = {
          code: action.payload.code,
          name: action.meta.arg.name
        };
        state.clubAreas?.push(createdArea);
        state.loading = "idle";
      })
      .addCase(createClubArea.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createClubArea.pending, (state) => {
        state.loading = "loading";
      })
      // delete room
      .addCase(deleteArea.fulfilled, (state, action) => {
        if (state.clubAreas) {
          const index = state.clubAreas.findIndex(
            (item) => item.code === action.meta.arg
          );
          state.clubAreas.splice(index, 1);
        }
        state.loading = "idle";
      })
      .addCase(deleteArea.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteArea.pending, (state) => {
        state.loading = "loading";
      })
      // edit room
      .addCase(editArea.fulfilled, (state, action) => {
        if (state.clubAreas) {
          const index = state.clubAreas.findIndex(
            (item) => item.code === action.meta.arg.code
          );
          state.clubAreas[index].name = action.meta.arg.name;
        }
        state.loading = "idle";
      })
      .addCase(editArea.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editArea.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: clubAreasActions, reducer: clubAreasReducer } =
  clubAreasSlice;
