import type { IRoutesPaths } from "@shared/models/routes";

export enum SlidersSlugsEnum {
  sliders = "sliders",
  slider_create = "slider_create",
  slider_edit = "slider_edit"
}

export const slidersRoutesPaths: IRoutesPaths<SlidersSlugsEnum> = {
  sliders: {
    URL: () => `/sliders`,
    title: "Слайдеры",
    public: false,
    mainMenu: true
  },
  slider_create: {
    URL: () => "/sliders/create",
    title: "Добавление слайдера",
    public: false,
    mainMenu: false
  },
  slider_edit: {
    URL: (id = ":id") => `/sliders/${id}/edit`,
    title: "Редактирование слайдера",
    public: false,
    mainMenu: false
  }
};
