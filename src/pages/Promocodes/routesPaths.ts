import type { IRoutesPaths } from "@shared/models/routes";

export enum PromocodesSlugsEnum {
  promocodes = "promocodes",
  promocode_create = "promocode_create",
  promocode_edit = "promocode_edit"
}

export const promocodesRoutesPaths: IRoutesPaths<PromocodesSlugsEnum> = {
  promocodes: {
    URL: () => "/promocodes",
    title: "Промокоды",
    public: false,
    mainMenu: true
  },
  promocode_create: {
    URL: () => "/promocodes/create",
    title: "Добавление промокода",
    public: false,
    mainMenu: false
  },
  promocode_edit: {
    URL: (id = ":id") => `/promocodes/${id}/edit`,
    title: "Редактирование промокода",
    public: false,
    mainMenu: false
  }
};
