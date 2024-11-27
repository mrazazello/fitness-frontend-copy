import { Space, Switch, Table } from "antd";
import { ColumnProps } from "antd/lib/table";

import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { useAppDispatch } from "@app/index";

import { IPromocodeListItem } from "../model/types/promocodes";
import { deletePromocode } from "../model/service/deletePromocode";

type TProps = {
  promocodes?: IPromocodeListItem[];
  loading: boolean;
  onEdit: (code: string) => void;
};

export const PromocodesList = (props: TProps) => {
  const { promocodes, loading, onEdit } = props;
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

  return <Table dataSource={promocodes} columns={columns} loading={loading} />;
};
