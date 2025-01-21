import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import type { IOrdersListItem } from "@entities/orders";
import {
  OrdersList,
  fetchOrders,
  getOrdersLoading,
  getOrdersPagination,
  ordersSelectors
} from "@entities/orders";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import useTableFilters from "@shared/hooks/useTableFilters";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { ordersRoutesPaths } from "./routesPaths";

const Orders = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { onPageChange } = useTableFilters();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchOrders({ page: Number(searchParams.get("page")) || 1 }));
  }, [searchParams]);

  const loading = useAppSelector(getOrdersLoading);
  const pagination = useAppSelector(getOrdersPagination);

  const orders = addReactKeyByProperty<IOrdersListItem>(
    useAppSelector(ordersSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader title={ordersRoutesPaths.orders.title} />
      <Card>
        <ShowErrorMessages />
        <OrdersList
          orders={orders}
          loading={loading === "loading"}
          pagination={pagination}
          onView={(code: string) => ordersRoutesPaths.order.URL(code)}
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
};

export default Orders;
