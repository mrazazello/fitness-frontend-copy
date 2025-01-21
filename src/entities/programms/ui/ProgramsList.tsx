import { Space, Table } from "antd";
import type { ColumnProps } from "antd/lib/table";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";

import { deleteProgramm } from "../model/service/deleteProgramm";
import type { IProgramListItem } from "../model/types/programms";

type TProps = {
  programms?: IProgramListItem[];
  loading: boolean;
  onEdit: (code: string) => void;
};

export const ProgramsList = (props: TProps) => {
  const { programms, loading, onEdit } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<IProgramListItem>[] = [
    {
      title: "Программа",
      dataIndex: "name",
      key: "name",
      width: "20%"
    },
    {
      title: "Продолжительность",
      dataIndex: "duration",
      key: "duration",
      responsive: ["xxl", "xl", "lg", "md"]
    },
    {
      title: "Калории",
      dataIndex: "calories",
      key: "calories",
      responsive: ["xxl", "xl", "lg", "md"]
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
            onDelete={() => dispatch(deleteProgramm(record.code))}
          />
        </Space>
      )
    }
  ];

  return <Table dataSource={programms} columns={columns} loading={loading} />;
};
