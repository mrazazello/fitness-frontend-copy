import { BarcodeOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { PromocodesAsync } from "./Promocodes.async";
import { PromocodeCreateAsync } from "./PromocodeCreate.async";
import { PromocodeEditAsync } from "./PromocodeEdit.async";

export enum PromocodesSlugsEnum {
  promocodes = "promocodes",
  promocode_create = "promocode_create",
  promocode_edit = "promocode_edit"
}

export const promocodesRoutes: IRoutes<PromocodesSlugsEnum> = {
  promocodes: {
    URL: () => "/promocodes",
    element: <PromocodesAsync />,
    title: "Промокоды",
    public: false,
    mainMenu: true,
    icon: <BarcodeOutlined />
  },
  promocode_create: {
    URL: () => "/promocodes/create",
    element: <PromocodeCreateAsync />,
    title: "Добавление промокода",
    public: false,
    mainMenu: false
  },
  promocode_edit: {
    URL: (id = ":id") => `/promocodes/${id}/edit`,
    element: <PromocodeEditAsync />,
    title: "Редактирование промокода",
    public: false,
    mainMenu: false
  }
};
