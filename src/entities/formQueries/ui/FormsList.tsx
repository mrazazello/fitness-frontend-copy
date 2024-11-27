import { Pagination, Table, Tag } from "antd";
import { ColumnProps } from "antd/lib/table";
import { Link, To } from "react-router-dom";

import TooltipDate from "@shared/ui/TooltipDate/TooltipDate";
import { IPagination } from "@shared/models/slice";

import { IFormQueriesListItem } from "../model/types/formQueries";

type TProps = {
  forms?: IFormQueriesListItem[];
  loading: boolean;
  pagination?: IPagination;
  onView: (code: string) => To;
  onPageChange: (page: number) => void;
};

export const FormsList = (props: TProps) => {
  const { forms, loading, pagination, onView, onPageChange } = props;

  const columns: ColumnProps<IFormQueriesListItem>[] = [
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <Link to={onView(record.code)}>
          <TooltipDate date={record.createdAt} />
        </Link>
      )
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.name}`
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => <Tag>{record.type}</Tag>
    },
    {
      title: "club",
      dataIndex: "club",
      key: "club",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => record.club?.name
    }
  ];

  return (
    <>
      <Table
        dataSource={forms}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      {pagination && (
        <Pagination
          current={pagination?.currentPage}
          pageSize={pagination?.pageSize}
          total={pagination?.total}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      )}
    </>
  );
};
