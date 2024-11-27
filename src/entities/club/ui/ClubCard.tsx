import { Descriptions, Typography } from "antd";

import { IClubAddress, IClubDetail } from "../model/types/clubs";

type TProps = {
  clubDetail?: IClubDetail;
  clubAddress?: IClubAddress;
};

const { Paragraph } = Typography;

export const ClubCard = (props: TProps) => {
  const { clubDetail, clubAddress } = props;

  return (
    <Descriptions bordered>
      <Descriptions.Item label="Сокращенное название">
        {clubDetail?.clubName}
      </Descriptions.Item>
      <Descriptions.Item label="Полное название">
        {clubDetail?.title}
      </Descriptions.Item>
      <Descriptions.Item label="Телефон">{clubDetail?.phone}</Descriptions.Item>
      <Descriptions.Item label="Режим работы">
        {clubDetail?.timetable}
      </Descriptions.Item>
      <Descriptions.Item label="Примечание к режиму работы">
        {clubDetail?.timetableNote}
      </Descriptions.Item>
      <Descriptions.Item label="Адрес">
        Город: {clubAddress?.city}
        <br />
        {clubAddress?.streetType}: {clubAddress?.street}, дом:{" "}
        {clubAddress?.house}
        <br />
        вход: {clubAddress?.entrance}
        <br />
        координаты: [{clubAddress?.longtitude}, {clubAddress?.latitude}]
      </Descriptions.Item>
      <Descriptions.Item label="Описание">
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true
          }}
        >
          {clubDetail?.description}
        </Paragraph>
      </Descriptions.Item>
    </Descriptions>
  );
};
