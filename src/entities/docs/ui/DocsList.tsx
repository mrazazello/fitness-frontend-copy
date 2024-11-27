import { Space, Table } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";

import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { useAppDispatch } from "@app/index";

import { IDocsListItem } from "../model/types/docs";
import { deleteDoc } from "../model/service/deleteDoc";

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
