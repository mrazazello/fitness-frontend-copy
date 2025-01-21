import { Pagination, Table, Tag } from "antd";
import type { ColumnProps } from "antd/lib/table";
import type { To } from "react-router-dom";

import type { IPagination } from "@shared/models/slice";
import PaymentStatus from "@shared/ui/PaymentStatus/PaymentStatus";
import TooltipDate from "@shared/ui/TooltipDate/TooltipDate";
import getFullName from "@shared/utils/getFullName";

import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import type { IOrdersListItem } from "../model/types/orders";

type TProps = {
  orders?: IOrdersListItem[];
  loading: boolean;
  pagination?: IPagination;
  onView: (code: string) => To;
  onPageChange: (page: number) => void;
};

export const OrdersList = (props: TProps) => {
  const { orders, loading, pagination, onView, onPageChange } = props;
  const { navigateSave } = useNavigateBack();

  const viewHandler = (code: string) => {
    navigateSave(onView(code));
  };

  const columns: ColumnProps<IOrdersListItem>[] = [
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
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => getFullName(record.firstName, record.lastName)
    },
    {
      title: "Акция",
      dataIndex: "product",
      key: "product",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => record.productName
    },
    {
      title: "Клуб",
      dataIndex: "clubs",
      key: "clubs",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) =>
        record.clubList.items.map((club) => (
          <Tag key={club.code}>{club.name}</Tag>
        ))
    },
    {
      title: "Промокод",
      dataIndex: "promocode",
      key: "promocode",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => record.promocode
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <PaymentStatus status={record.status} />
    }
  ];

  return (
    <>
      <Table
        dataSource={orders}
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
