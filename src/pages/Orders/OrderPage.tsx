import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  OrderCard,
  fetchOrder,
  getOrderDetail,
  getOrdersLoading
} from "@entities/orders";

import { ordersRoutes } from "./Routes";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        title={ordersRoutes.order.title}
        onBack={() => navigate(ordersRoutes.orders.URL())}
      />
      <Card loading={loading === "loading"}>
        <ShowErrorMessages />
        <OrderCard orderDetail={orderDetail} />
      </Card>
    </>
  );
};

export default OrderPage;
