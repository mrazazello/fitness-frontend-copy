import { CrownOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const ProductCreateAsync = lazy(() => import("./ProductCreate"));
const ProductEditAsync = lazy(() => import("./ProductEdit"));
const ProductsAsync = lazy(() => import("./Products"));

import { ProductsSlugsEnum, productsRoutesPaths } from "./routesPaths";

export const productsRoutes: IRoutes<ProductsSlugsEnum> = {
  products: {
    ...productsRoutesPaths.products,
    element: <ProductsAsync />,
    icon: <CrownOutlined />
  },
  product_create: {
    ...productsRoutesPaths.product_create,
    element: <ProductCreateAsync />
  },
  product_edit: {
    ...productsRoutesPaths.product_edit,
    element: <ProductEditAsync />
  }
};
