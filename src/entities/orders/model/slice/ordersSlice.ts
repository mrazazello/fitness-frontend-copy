import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { fetchOrder } from "../service/fetchOrder";
import { fetchOrders } from "../service/fetchOrders";
import type { IOrderDetail, IOrdersListItem } from "../types/orders";

export interface IOrdersSchema extends IEntitiesState {
  entities?: IOrdersListItem[];
  orderDetail?: IOrderDetail;
}

const initialState: IOrdersSchema = {
  loading: "idle"
};

export const ordersAdapter = createEntityAdapter({
  selectId: (item: IOrdersListItem) => item.code
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch orders
      .addCase(fetchOrders.fulfilled, (state, action) => {
        ordersAdapter.removeAll(state);
        ordersAdapter.addMany(state, action.payload.customOrders.items);
        state.pagination = action.payload.customOrders.pagination;
        state.loading = "idle";
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = "loading";
      })
      // fetch order
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderDetail = action.payload.customOrder;
        state.loading = "idle";
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: ordersActions, reducer: orderReducer } = ordersSlice;
