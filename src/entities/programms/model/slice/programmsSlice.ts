import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import type { IProgramListItem } from "../types/programms";
import { fetchProgramms } from "../service/fetchProgramms";
import { fetchProgramm } from "../service/fetchProgramm";
import { createProgramm } from "../service/createProgramm";
import { editProgramm } from "../service/editProgramm";
import { deleteProgramm } from "../service/deleteProgramm";

export interface IProgrammsSchema extends IEntitiesState {
  entities?: IProgramListItem[];
}

const initialState: IProgrammsSchema = {
  loading: "idle"
};

export const prorgammsAdapter = createEntityAdapter({
  selectId: (item: IProgramListItem) => item.code
});

const programmsSlice = createSlice({
  name: "programms",
  initialState: prorgammsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch programs
      .addCase(fetchProgramms.fulfilled, (state, action) => {
        prorgammsAdapter.addMany(state, action.payload.programs.items);
        state.loading = "idle";
      })
      .addCase(fetchProgramms.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchProgramms.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one programm
      .addCase(fetchProgramm.fulfilled, (state, action) => {
        prorgammsAdapter.addOne(state, action.payload.program);
        state.loading = "idle";
      })
      .addCase(fetchProgramm.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchProgramm.pending, (state) => {
        state.loading = "loading";
      })
      // create programm
      .addCase(createProgramm.fulfilled, (state, action) => {
        const newProgramm: IProgramListItem = {
          code: action.payload.code,
          name: action.meta.arg.name,
          description: action.meta.arg.description,
          duration: action.meta.arg.duration,
          calories: action.meta.arg.calories
        };
        prorgammsAdapter.addOne(state, newProgramm);
        state.loading = "idle";
      })
      .addCase(createProgramm.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createProgramm.pending, (state) => {
        state.loading = "loading";
      })
      // edit programm
      .addCase(editProgramm.fulfilled, (state, action) => {
        const update = {
          id: action.meta.arg.code,
          changes: {
            name: action.meta.arg.name,
            description: action.meta.arg.description,
            duration: action.meta.arg.duration,
            calories: action.meta.arg.calories
          }
        };
        prorgammsAdapter.updateOne(state, update);
        state.loading = "idle";
      })
      .addCase(editProgramm.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editProgramm.pending, (state) => {
        state.loading = "loading";
      })
      // delete programm
      .addCase(deleteProgramm.fulfilled, (state, action) => {
        prorgammsAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteProgramm.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteProgramm.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: programmActions, reducer: programmReducer } =
  programmsSlice;
