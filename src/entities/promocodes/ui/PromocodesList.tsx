import { Pagination, Space, Switch, Table } from "antd";
import type { ColumnProps } from "antd/lib/table";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import type { IPagination } from "@shared/models/slice";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";

import { deletePromocode } from "../model/service/deletePromocode";
import type { IPromocodeListItem } from "../model/types/promocodes";

type TProps = {
  promocodes?: IPromocodeListItem[];
  loading: boolean;
  pagination?: IPagination;
  onEdit: (code: string) => void;
  onPageChange: (page: number) => void;
};

export const PromocodesList = (props: TProps) => {
  const { promocodes, loading, pagination, onEdit, onPageChange } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<IPromocodeListItem>[] = [
    {
      title: "Код",
      dataIndex: "secret",
      key: "secret"
    },
    {
      title: "Действует от",
      dataIndex: "startAt",
      key: "startAt",
      width: 130,
      responsive: ["xxl", "xl", "lg", "md"]
    },
    {
      title: "Действует до",
      dataIndex: "endAt",
      key: "endAt",
      width: 130,
      responsive: ["xxl", "xl", "lg", "md"]
    },
    {
      title: "Акции",
      dataIndex: "products",
      key: "products",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => record.products.map((item) => `${item.title} `)
    },
    {
      title: "Активен",
      dataIndex: "active",
      key: "active",
      render: (_, record) => (
        <Switch size="small" checked={record.active} disabled />
      )
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <EditEntityBtn onEdit={() => onEdit(record.code)} />
          <DeleteEntityBtn
            onDelete={() => dispatch(deletePromocode(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={promocodes}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      {pagination && (
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={pagination.total}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      )}
    </>
  );
};
