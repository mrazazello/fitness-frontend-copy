import { Tag } from "antd";

type PropsType = {
  status: string;
};

const PaymentStatus = ({ status }: PropsType) => {
  switch (status) {
    case "wait":
      return <Tag color="orange">в ожидании</Tag>;
    case "paid":
      return <Tag color="green">оплачен</Tag>;
    case "cancel":
      return <Tag color="red">отменен</Tag>;
    case "refund":
      return <Tag color="red">возврат</Tag>;
    case "fail":
      return <Tag color="red">ошибка</Tag>;
    default:
      return <Tag>неизвестный</Tag>;
  }
};

export default PaymentStatus;
