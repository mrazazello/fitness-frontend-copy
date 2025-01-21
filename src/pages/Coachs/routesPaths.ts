import type { IRoutesPaths } from "@shared/models/routes";

export enum CoachsSlugsEnum {
  coachs = "coachs",
  coach_create = "coach_create",
  coach_edit = "coach_edit"
}

export const coachsRoutesPaths: IRoutesPaths<CoachsSlugsEnum> = {
  coachs: {
    URL: () => "/coachs",
    title: "Тренеры",
    public: false,
    mainMenu: true
  },
  coach_create: {
    URL: () => "/coachs/create",
    title: "Добавление тренера",
    public: false,
    mainMenu: false
  },
  coach_edit: {
    URL: (id = ":id") => `/coachs/${id}/edit`,
    title: "Редактирование тренера",
    public: false,
    mainMenu: false
  }
};
