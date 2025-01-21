import type { IRoutesPaths } from "@shared/models/routes";

export enum ProgrammsSlugsEnum {
  programms = "programms",
  programm_edit = "programm_edit",
  programm_create = "programm_create"
}

export const programmsRoutesPaths: IRoutesPaths<ProgrammsSlugsEnum> = {
  programms: {
    URL: () => "/programms",
    title: "Программы",
    public: false,
    mainMenu: true
  },
  programm_edit: {
    URL: (id = ":id") => `/programms/${id}/edit`,
    title: "Редактирование программы",
    public: false,
    mainMenu: false
  },
  programm_create: {
    URL: () => "/programms/create",
    title: "Добавление программы",
    public: false,
    mainMenu: false
  }
};
