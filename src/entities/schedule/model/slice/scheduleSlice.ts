import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState, ISorterRusult } from "@shared/models/slice";

import {
  convertScheduleCreateArgsToDetail,
  IScheduleDetail,
  IScheduleFilters,
  IScheduleListItem
} from "../types/schedule";
import { fetchEvents } from "../service/fetchEvents";
import { deleteEvent } from "../service/deleteEvent";
import { createEvent } from "../service/createEvent";
import { fetchEvent } from "../service/fetchEvent";
import { editEvent } from "../service/editEvent";
import { copyEvents } from "../service/copyEvents";

export interface IScheduleSchema extends IEntitiesState {
  entities?: IScheduleListItem;
  eventDetail: IScheduleDetail | null;
  filters?: IScheduleFilters;
  sorter: ISorterRusult | ISorterRusult[];
}

const initialState: IScheduleSchema = {
  loading: "idle",
  eventDetail: null,
  sorter: {}
};

export const scheduleAdapter = createEntityAdapter({
  selectId: (item: IScheduleListItem) => item.code
});

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: scheduleAdapter.getInitialState(initialState),
  reducers: {
    resetEventDetail: (state) => {
      state.eventDetail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch events
      .addCase(fetchEvents.fulfilled, (state, action) => {
        scheduleAdapter.setAll(state, action.payload.schedule.items);
        state.filters = action.payload.schedule.filter;
        state.pagination = action.payload.schedule.pagination;
        state.loading = "idle";
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = "loading";
      })
      // delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        scheduleAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = "loading";
      })
      // create event in schedule
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventDetail = convertScheduleCreateArgsToDetail(action.meta.arg);
        const eventListItem = {
          code: action.payload.code,
          ...action.meta.arg
        };
        scheduleAdapter.addOne(state, eventListItem);
        state.loading = "idle";
      })
      .addCase(createEvent.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one event
      .addCase(fetchEvent.fulfilled, (state, action) => {
        console.log("fetch one event: ", action.payload);
        state.eventDetail = convertScheduleCreateArgsToDetail(
          action.payload.schedule
        );
        state.loading = "idle";
      })
      .addCase(fetchEvent.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchEvent.pending, (state) => {
        state.loading = "loading";
      })
      // edit event
      .addCase(editEvent.fulfilled, (state, action) => {
        state.eventDetail = convertScheduleCreateArgsToDetail(action.meta.arg);
        const update = {
          id: action.meta.arg.code,
          changes: { ...action.meta.arg }
        };
        scheduleAdapter.updateOne(state, update);
        state.loading = "idle";
      })
      .addCase(editEvent.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editEvent.pending, (state) => {
        state.loading = "loading";
      })
      // copy events
      .addCase(copyEvents.fulfilled, (state) => {
        state.loading = "idle";
      })
      .addCase(copyEvents.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(copyEvents.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: scheduleActions, reducer: scheduleReducer } =
  scheduleSlice;
