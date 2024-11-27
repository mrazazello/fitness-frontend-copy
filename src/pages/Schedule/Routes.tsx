import { CalendarOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { ScheduleAsync } from "./Schedule.async";
import { ScheduleCreateAsync } from "./ScheduleCreate.async";
import { ScheduleEditAsync } from "./ScheduleEdit.async";

export enum ScheduleSlugsEnum {
  schedule = "schedule",
  schedule_create = "schedule_create",
  schedule_edit = "schedule_edit"
}

export const scheduleRoutes: IRoutes<ScheduleSlugsEnum> = {
  schedule: {
    URL: () => "/schedule",
    element: <ScheduleAsync />,
    title: "Расписание",
    public: false,
    mainMenu: true,
    icon: <CalendarOutlined />
  },
  schedule_create: {
    URL: () => "/schedule/create",
    element: <ScheduleCreateAsync />,
    title: "Добавление события",
    public: false,
    mainMenu: false
  },
  schedule_edit: {
    URL: (id = ":id") => `/schedule/${id}/edit`,
    element: <ScheduleEditAsync />,
    title: "Редактирование события",
    public: false,
    mainMenu: false
  }
};
