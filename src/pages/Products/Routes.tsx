import { CrownOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { ProductsAsync } from "./Products.async";
import { ProductCreateAsync } from "./ProductCreate.async";
import { ProductEditAsync } from "./ProductEdit.async";

export enum ProductsSlugsEnum {
  products = "products",
  product_create = "product_create",
  product_edit = "product_edit"
}

export const productsRoutes: IRoutes<ProductsSlugsEnum> = {
  products: {
    URL: () => "/products",
    element: <ProductsAsync />,
    title: "Акции",
    public: false,
    mainMenu: true,
    icon: <CrownOutlined />
  },
  product_create: {
    URL: () => "/products/create",
    element: <ProductCreateAsync />,
    title: "Добавление акции",
    public: false,
    mainMenu: false
  },
  product_edit: {
    URL: (id = ":id") => `/products/${id}/edit`,
    element: <ProductEditAsync />,
    title: "Редактирование акции",
    public: false,
    mainMenu: false
  }
};
