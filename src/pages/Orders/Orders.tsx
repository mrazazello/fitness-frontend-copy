import { Card, PageHeader } from "antd";
import { useEffect } from "react";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  IOrdersListItem,
  OrdersList,
  fetchOrders,
  getOrdersLoading,
  getOrdersPagination,
  ordersSelectors
} from "@entities/orders";

import { ordersRoutes } from "./Routes";

const Orders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchOrders({ page: 1 }));
  }, []);

  const loading = useAppSelector(getOrdersLoading);
  const pagination = useAppSelector(getOrdersPagination);

  const orders = addReactKeyByProperty<IOrdersListItem>(
    useAppSelector(ordersSelectors.selectAll),
    "code"
  );

  const onPageChange = (page: number) => {
    void dispatch(fetchOrders({ page }));
  };

  return (
    <>
      <PageHeader title={ordersRoutes.orders.title} />
      <Card>
        <ShowErrorMessages />
        <OrdersList
          orders={orders}
          loading={loading === "loading"}
          pagination={pagination}
          onView={(code: string) => ordersRoutes.order.URL(code)}
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
};

export default Orders;
