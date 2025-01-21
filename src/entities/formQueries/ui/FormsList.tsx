import { Pagination, Table, Tag } from "antd";
import type { ColumnProps } from "antd/lib/table";
import type { To } from "react-router-dom";

import type { IPagination } from "@shared/models/slice";
import TooltipDate from "@shared/ui/TooltipDate/TooltipDate";

import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import type { IFormQueriesListItem } from "../model/types/formQueries";

type TProps = {
  forms?: IFormQueriesListItem[];
  loading: boolean;
  pagination?: IPagination;
  onView: (code: string) => To;
  onPageChange: (page: number) => void;
};

export const FormsList = (props: TProps) => {
  const { forms, loading, pagination, onView, onPageChange } = props;
  const { navigateSave } = useNavigateBack();

  const viewHandler = (code: string) => {
    navigateSave(onView(code));
  };

  const columns: ColumnProps<IFormQueriesListItem>[] = [
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <a onClick={() => viewHandler(record.code)}>
          <TooltipDate date={record.createdAt} />
        </a>
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
