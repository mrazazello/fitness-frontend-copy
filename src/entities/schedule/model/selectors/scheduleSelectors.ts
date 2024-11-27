import { RootState } from "@app/index";

import { scheduleAdapter } from "../slice/scheduleSlice";

export const scheduleSelectors = scheduleAdapter.getSelectors<RootState>(
  (state: RootState) => state.schedule
);

export const getScheduleFilters = (state: RootState) => state.schedule.filters;

export const getScheduleLoading = (state: RootState) => state.schedule.loading;

export const getScheduleDetail = (state: RootState) =>
  state.schedule.eventDetail;
