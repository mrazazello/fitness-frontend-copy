import type { IRoutesPaths } from "@shared/models/routes";

export enum OffersSlugsEnum {
  offers = "offers",
  offer_create = "offer_create",
  offer_edit = "offer_edit"
}

export const offersRoutesPaths: IRoutesPaths<OffersSlugsEnum> = {
  offers: {
    URL: () => "/offers",
    title: "Спец-предложения",
    public: false,
    mainMenu: true
  },
  offer_create: {
    URL: () => "/offers/create",
    title: "Добавление спец-предложения",
    public: false,
    mainMenu: false
  },
  offer_edit: {
    URL: (id = ":id") => `/offers/${id}/edit`,
    title: "Редактирование спец-предложения",
    public: false,
    mainMenu: false
  }
};
