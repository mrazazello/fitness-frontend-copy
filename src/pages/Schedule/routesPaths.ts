import type { IRoutesPaths } from "@shared/models/routes";

export enum ScheduleSlugsEnum {
  schedule = "schedule",
  schedule_create = "schedule_create",
  schedule_edit = "schedule_edit"
}

export const scheduleRoutesPaths: IRoutesPaths<ScheduleSlugsEnum> = {
  schedule: {
    URL: () => "/schedule",
    title: "Расписание",
    public: false,
    mainMenu: true
  },
  schedule_create: {
    URL: () => "/schedule/create",
    title: "Добавление события",
    public: false,
    mainMenu: false
  },
  schedule_edit: {
    URL: (id = ":id") => `/schedule/${id}/edit`,
    title: "Редактирование события",
    public: false,
    mainMenu: false
  }
};
