import {
  IScheduleListItem,
  IScheduleListRequestParams,
  IScheduleCreateValues,
  IScheduleEditArgs
} from "./model/types/schedule";
import {
  scheduleSelectors,
  getScheduleFilters,
  getScheduleLoading,
  getScheduleDetail
} from "./model/selectors/scheduleSelectors";
import { createEvent } from "./model/service/createEvent";
import { deleteEvent } from "./model/service/deleteEvent";
import { editEvent } from "./model/service/editEvent";
import { fetchEvent } from "./model/service/fetchEvent";
import { fetchEvents } from "./model/service/fetchEvents";
import { copyEvents } from "./model/service/copyEvents";
import {
  scheduleActions,
  scheduleReducer,
  IScheduleSchema
} from "./model/slice/scheduleSlice";
import { ScheduleTableView } from "./ui/ScheduleTableView";
import { ScheduleWeekView } from "./ui/ScheduleWeekView";
import { ScheduleEditForm } from "./ui/ScheduleEditForm";

export type {
  IScheduleListItem,
  IScheduleListRequestParams,
  IScheduleCreateValues,
  IScheduleEditArgs,
  IScheduleSchema
};

export {
  scheduleSelectors,
  getScheduleFilters,
  getScheduleLoading,
  getScheduleDetail
};
export {
  fetchEvents,
  createEvent,
  deleteEvent,
  editEvent,
  fetchEvent,
  copyEvents
};
export { scheduleActions, scheduleReducer };
export { ScheduleTableView, ScheduleWeekView, ScheduleEditForm };
