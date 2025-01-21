import type { IOrdersListItem, IOrderDetail } from "./model/types/orders";
import { ordersActions, orderReducer } from "./model/slice/ordersSlice";
import {
  ordersSelectors,
  getOrderDetail,
  getOrdersLoading,
  getOrdersPagination
} from "./model/selectors/ordersSelectors";
import { fetchOrder } from "./model/service/fetchOrder";
import { fetchOrders } from "./model/service/fetchOrders";
import { OrdersList } from "./ui/OrdersList";
import { OrderCard } from "./ui/OrderCard";

export type { IOrdersListItem, IOrderDetail };
export { ordersActions, orderReducer };
export {
  getOrderDetail,
  getOrdersLoading,
  ordersSelectors,
  getOrdersPagination
};
export { fetchOrders, fetchOrder };
export { OrdersList, OrderCard };
