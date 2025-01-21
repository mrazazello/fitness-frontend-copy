import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  OrderCard,
  fetchOrder,
  getOrderDetail,
  getOrdersLoading
} from "@entities/orders";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";

import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import { ordersRoutesPaths } from "./routesPaths";

const OrderPage = () => {
  const { id } = useParams();
  const { navigateBack } = useNavigateBack();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchOrder(id));
  }, [id]);

  const loading = useAppSelector(getOrdersLoading);
  const orderDetail = useAppSelector(getOrderDetail);

  return (
    <>
      <PageHeader
        title={ordersRoutesPaths.order.title}
        onBack={() => navigateBack(ordersRoutesPaths.orders.URL())}
      />
      <Card loading={loading === "loading"}>
        <ShowErrorMessages />
        <OrderCard orderDetail={orderDetail} />
      </Card>
    </>
  );
};

export default OrderPage;
