import type { IRoutesPaths } from "@shared/models/routes";

export enum OrdersSlugsEnum {
  orders = "orders",
  order = "order"
}

export const ordersRoutesPaths: IRoutesPaths<OrdersSlugsEnum> = {
  orders: {
    URL: () => `/orders`,
    title: "Заказы",
    public: false,
    mainMenu: true
  },
  order: {
    URL: (id = ":id") => `/orders/${id}`,
    title: "Заказ",
    public: false,
    mainMenu: false
  }
};
