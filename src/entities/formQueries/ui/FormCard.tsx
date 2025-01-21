import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";

import type { IFormQuerieDetail } from "../model/types/formQueries";

type TProps = {
  formDetail?: IFormQuerieDetail;
};

export const FormCard = (props: TProps) => {
  const { formDetail } = props;

  return (
    <Descriptions>
      <Descriptions.Item label="createdAt">
        {dayjs(formDetail?.createdAt).format("DD-MM-YYYY HH:MM")}
      </Descriptions.Item>
      <Descriptions.Item label="Имя">{formDetail?.name}</Descriptions.Item>
      <Descriptions.Item label="Телефон">
        {formDetail?.phone ? formDetail?.phone : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Клуб">
        {formDetail?.club ? formDetail?.club.name : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Спец-предложение">
        {formDetail?.specialOffer ? formDetail?.specialOffer.name : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Форма">
        <Tag>{formDetail?.type}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Пожелания">
        {formDetail?.note}
      </Descriptions.Item>
    </Descriptions>
  );
};
