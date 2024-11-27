import { CoffeeOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { OffersAsync } from "./Offers.async";
import { OfferCreateAsync } from "./OfferCreate.async";
import { OfferEditAsync } from "./OfferEdit.async";

export enum OffersSlugsEnum {
  offers = "offers",
  offer_create = "offer_create",
  offer_edit = "offer_edit"
}

export const offersRoutes: IRoutes<OffersSlugsEnum> = {
  offers: {
    URL: () => "/offers",
    element: <OffersAsync />,
    title: "Спец-предложения",
    public: false,
    mainMenu: true,
    icon: <CoffeeOutlined />
  },
  offer_create: {
    URL: () => "/offers/create",
    element: <OfferCreateAsync />,
    title: "Добавление спец-предложения",
    public: false,
    mainMenu: false
  },
  offer_edit: {
    URL: (id = ":id") => `/offers/${id}/edit`,
    element: <OfferEditAsync />,
    title: "Редактирование спец-предложения",
    public: false,
    mainMenu: false
  }
};
