import type { PayloadAction } from "@reduxjs/toolkit";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type {
  FilterType,
  IEntitiesState,
  ISorterRusult
} from "@shared/models/slice";

import { createCoach } from "../service/createCoach";
import { deleteCoach } from "../service/deleteCoach";
import { editCoach } from "../service/editCoach";
import { fetchCoach } from "../service/fetchCoach";
import { fetchCoachs } from "../service/fetchCoachs";
import type { ICoachDetail, ICoachListItem } from "../types/coachs";
import {
  covertICoachCreatedArgs2IcoachListItem,
  covertICoachEditArgs2IcoachDetail,
  covertICoachEditArgs2IcoachListItem
} from "../types/coachs";

export interface ICoachsSchema extends IEntitiesState {
  entities?: ICoachListItem[];
  coachDetail?: ICoachDetail;
  filters: FilterType;
  sorter: ISorterRusult | ISorterRusult[];
}

const initialState: ICoachsSchema = {
  loading: "idle",
  filters: {},
  sorter: {}
};

export const coachsAdapter = createEntityAdapter({
  selectId: (item: ICoachListItem) => item.code
});

const coachsSlice = createSlice({
  name: "coachs",
  initialState: coachsAdapter.getInitialState(initialState),
  reducers: {
    setFilters: (state, action: PayloadAction<FilterType>) => {
      state.filters = action.payload;
    },
    setSorter: (
      state,
      action: PayloadAction<ISorterRusult | ISorterRusult[]>
    ) => {
      state.sorter = action.payload;
    },
    resetDetail: (state) => {
      state.coachDetail = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch coachs
      .addCase(fetchCoachs.fulfilled, (state, action) => {
        coachsAdapter.addMany(state, action.payload.teachers.items);
        state.loading = "idle";
      })
      .addCase(fetchCoachs.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchCoachs.pending, (state) => {
        state.loading = "loading";
      })
      // create coach
      .addCase(createCoach.fulfilled, (state, action) => {
        const newCoach: ICoachListItem = covertICoachCreatedArgs2IcoachListItem(
          action.payload.code,
          action.meta.arg
        );
        coachsAdapter.addOne(state, newCoach);
        state.loading = "idle";
      })
      .addCase(createCoach.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createCoach.pending, (state) => {
        state.loading = "loading";
      })
      // delete coach
      .addCase(deleteCoach.fulfilled, (state, action) => {
        coachsAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteCoach.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteCoach.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one coach
      .addCase(fetchCoach.fulfilled, (state, action) => {
        state.coachDetail = action.payload.teacher;
        state.loading = "idle";
      })
      .addCase(fetchCoach.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchCoach.pending, (state) => {
        state.loading = "loading";
      })
      // edit coach
      .addCase(editCoach.fulfilled, (state, action) => {
        state.coachDetail = covertICoachEditArgs2IcoachDetail(action.meta.arg);
        const updateCoach = {
          id: action.meta.arg.code,
          changes: covertICoachEditArgs2IcoachListItem(action.meta.arg)
        };
        coachsAdapter.updateOne(state, updateCoach);
        state.loading = "idle";
      })
      .addCase(editCoach.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editCoach.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: coachActions, reducer: coachReducer } = coachsSlice;
