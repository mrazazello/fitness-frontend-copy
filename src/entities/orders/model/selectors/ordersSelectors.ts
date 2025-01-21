import type { RootState } from "@app/index";

import { ordersAdapter } from "../slice/ordersSlice";

export const ordersSelectors = ordersAdapter.getSelectors<RootState>(
  (state: RootState) => state.orders
);

export const getOrdersLoading = (state: RootState) => state.orders.loading;

export const getOrderDetail = (state: RootState) => state.orders.orderDetail;

export const getOrdersPagination = (state: RootState) =>
  state.orders.pagination;
