import { CalendarOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const ScheduleAsync = lazy(() => import("./Schedule"));
const ScheduleCreateAsync = lazy(() => import("./ScheduleCreate"));
const ScheduleEditAsync = lazy(() => import("./ScheduleEdit"));

import { ScheduleSlugsEnum, scheduleRoutesPaths } from "./routesPaths";

export const scheduleRoutes: IRoutes<ScheduleSlugsEnum> = {
  schedule: {
    ...scheduleRoutesPaths.schedule,
    element: <ScheduleAsync />,
    icon: <CalendarOutlined />
  },
  schedule_create: {
    ...scheduleRoutesPaths.schedule_create,
    element: <ScheduleCreateAsync />
  },
  schedule_edit: {
    ...scheduleRoutesPaths.schedule_edit,
    element: <ScheduleEditAsync />
  }
};
