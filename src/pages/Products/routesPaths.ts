import type { IRoutesPaths } from "@shared/models/routes";

export enum ProductsSlugsEnum {
  products = "products",
  product_create = "product_create",
  product_edit = "product_edit"
}

export const productsRoutesPaths: IRoutesPaths<ProductsSlugsEnum> = {
  products: {
    URL: () => "/products",
    title: "Акции",
    public: false,
    mainMenu: true
  },
  product_create: {
    URL: () => "/products/create",
    title: "Добавление акции",
    public: false,
    mainMenu: false
  },
  product_edit: {
    URL: (id = ":id") => `/products/${id}/edit`,
    title: "Редактирование акции",
    public: false,
    mainMenu: false
  }
};
