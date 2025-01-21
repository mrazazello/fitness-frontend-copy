import { CheckCircleOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import type { ColumnProps } from "antd/lib/table";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";

import { deleteDoc } from "../model/service/deleteDoc";
import type { IDocsListItem } from "../model/types/docs";

type TProps = {
  docs?: IDocsListItem[];
  loading: boolean;
  onEdit: (code: string) => void;
};

export const DocsList = (props: TProps) => {
  const { docs, loading, onEdit } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<IDocsListItem>[] = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      width: "100%"
    },
    {
      title: "Показывать на главной",
      dataIndex: "mainPageShow",
      key: "mainPageShow",
      width: "10%",
      align: "center",
      render: (_, record) => record.mainPageShow && <CheckCircleOutlined />
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <EditEntityBtn onEdit={() => onEdit(record.code)} />
          <DeleteEntityBtn onDelete={() => dispatch(deleteDoc(record.code))} />
        </Space>
      )
    }
  ];

  return <Table dataSource={docs} columns={columns} loading={loading} />;
};
