import { DollarOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const OrderPageAsync = lazy(() => import("./OrderPage"));
const OrdersAsync = lazy(() => import("./Orders"));

import { OrdersSlugsEnum, ordersRoutesPaths } from "./routesPaths";

export const ordersRoutes: IRoutes<OrdersSlugsEnum> = {
  orders: {
    ...ordersRoutesPaths.orders,
    element: <OrdersAsync />,
    icon: <DollarOutlined />
  },
  order: {
    ...ordersRoutesPaths.order,
    element: <OrderPageAsync />
  }
};
