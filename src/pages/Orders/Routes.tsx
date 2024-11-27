import { DollarOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { OrdersAsync } from "./Orders.async";
import { OrderPageAsync } from "./OrderPage.async";

export enum OrdersSlugsEnum {
  orders = "orders",
  order = "order"
}

export const ordersRoutes: IRoutes<OrdersSlugsEnum> = {
  orders: {
    URL: () => `/orders`,
    element: <OrdersAsync />,
    title: "Заказы",
    public: false,
    mainMenu: true,
    icon: <DollarOutlined />
  },
  order: {
    URL: (id = ":id") => `/orders/${id}`,
    element: <OrderPageAsync />,
    title: "Заказ",
    public: false,
    mainMenu: false
  }
};
