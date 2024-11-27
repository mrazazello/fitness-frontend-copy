import { Descriptions, Divider, Tag } from "antd";
import dayjs from "dayjs";

import getFullName from "@shared/utils/getFullName";
import PaymentStatus from "@shared/ui/PaymentStatus/PaymentStatus";
import { dateFormatDate, dateFormatFull } from "@shared/constants/params";

import { IOrderDetail } from "../model/types/orders";

type TProps = {
  orderDetail?: IOrderDetail;
};

export const OrderCard = (props: TProps) => {
  const { orderDetail } = props;

  if (!orderDetail) return null;

  return (
    <>
      <Descriptions title="Основная информация заказа">
        <Descriptions.Item label="Дата создания">
          {dayjs(orderDetail.createdAt).format(dateFormatFull)}
        </Descriptions.Item>
        <Descriptions.Item label="Код">{orderDetail.code}</Descriptions.Item>
        <Descriptions.Item label="Статус">
          <PaymentStatus status={orderDetail.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Стоимость">
          {orderDetail.amount} ₽
        </Descriptions.Item>
        <Descriptions.Item label="Промокод">
          {orderDetail.promocode}
        </Descriptions.Item>
        <Descriptions.Item label="Скидка по промокоду">
          {orderDetail.promocodeDiscount}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Владелец заказа">
        <Descriptions.Item label="Имя владельца">
          {getFullName(orderDetail.firstName, orderDetail.lastName)}
        </Descriptions.Item>
        <Descriptions.Item label="День рождения">
          {dayjs(orderDetail.birthday).format(dateFormatDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон">
          <a href={`tel:${orderDetail.phone}`}>{orderDetail.phone}</a>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Даритель заказа">
        <Descriptions.Item label="Куплен в подарок">
          {orderDetail.gift ? "да" : "нет"}
        </Descriptions.Item>
        <Descriptions.Item label="Имя дарителя">
          {getFullName(orderDetail.gifterFirstName, orderDetail.gifterLastName)}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон дарителя">
          <a href={`tel:${orderDetail.gifterPhone}`}>
            {orderDetail.gifterPhone}
          </a>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Предмет заказа">
        <Descriptions.Item label="Код акции">
          {orderDetail.productCode}
        </Descriptions.Item>
        <Descriptions.Item label="Акция">
          {orderDetail.productName}
        </Descriptions.Item>
        <Descriptions.Item label="Цена акции">
          {orderDetail.productPrice}
        </Descriptions.Item>
        <Descriptions.Item label="Клуб акции" span={3}>
          {orderDetail.clubList.items.map((club) => (
            <Tag key={club.code}>{club.name}</Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
