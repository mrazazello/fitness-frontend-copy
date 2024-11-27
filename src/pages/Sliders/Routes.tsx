import { ExclamationCircleOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { SlidersAsync } from "./Sliders.async";
import { SliderCreateAsync } from "./SliderCreate.async";
import { SliderEditAsync } from "./SliderEdit.async";

export enum SlidersSlugsEnum {
  sliders = "sliders",
  slider_create = "slider_create",
  slider_edit = "slider_edit"
}

export const slidersRoutes: IRoutes<SlidersSlugsEnum> = {
  sliders: {
    URL: () => `/sliders`,
    element: <SlidersAsync />,
    title: "Слайдеры",
    public: false,
    mainMenu: true,
    icon: <ExclamationCircleOutlined />
  },
  slider_create: {
    URL: () => "/sliders/create",
    element: <SliderCreateAsync />,
    title: "Добавление слайдера",
    public: false,
    mainMenu: false
  },
  slider_edit: {
    URL: (id = ":id") => `/sliders/${id}/edit`,
    element: <SliderEditAsync />,
    title: "Редактирование слайдера",
    public: false,
    mainMenu: false
  }
};
