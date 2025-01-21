import { Table } from "antd";
import type { ColumnProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import type { To } from "react-router-dom";

import type { IClubListItem } from "../model/types/clubs";

type EProps = {
  clubs: IClubListItem[];
  loading: boolean;
  clubURL: (id: string) => To;
};

export const ClubsList = (props: EProps) => {
  const { clubs, loading, clubURL } = props;

  const columns: ColumnProps<IClubListItem>[] = [
    {
      title: "Клуб",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Link to={clubURL(record.code)}>{record.name}</Link>
      )
    },
    {
      title: "Телефон",
      dataIndex: "contactPhone",
      key: "contactPhone"
    }
  ];

  return (
    <Table
      dataSource={clubs}
      columns={columns}
      pagination={false}
      loading={loading}
    />
  );
};
