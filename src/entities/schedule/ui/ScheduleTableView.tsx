import { Space, Table, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { ColumnProps } from "antd/lib/table";
import { DollarCircleOutlined } from "@ant-design/icons";

import getFullName from "@shared/utils/getFullName";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { useAppDispatch } from "@app/index";
import { IRowSelection } from "@shared/hooks/useTableRowSelection";

import { IScheduleListItem } from "../model/types/schedule";
import { deleteEvent } from "../model/service/deleteEvent";

type TProps = {
  events?: IScheduleListItem[];
  loading: boolean;
  rowSelection: IRowSelection;
  onEdit: (code: string) => void;
};

export const ScheduleTableView = (props: TProps) => {
  const { events, loading, rowSelection, onEdit } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<IScheduleListItem>[] = [
    {
      title: "Дата",
      dataIndex: "startedAt",
      key: "startedAt",
      render: (_, record) => (
        <div style={{ whiteSpace: "nowrap" }}>
          {dayjs(record.startedAt).format("YYYY-MM-DD")}
        </div>
      ),
      width: 150
    },
    {
      title: "Время",
      dataIndex: "startedAt",
      key: "startedAt",
      render: (_, record) => dayjs(record.startedAt).format("HH:mm"),
      width: "150px"
    },
    {
      title: "День недели",
      dataIndex: "weekday",
      key: "weekday",
      render: (_, record) => <Tag>{dayjs(record.startedAt).format("dddd")}</Tag>
    },
    {
      title: "Программа",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (_, record) => (
        <Tooltip title={record.program.description}>
          {record.program.name}
        </Tooltip>
      )
    },
    {
      title: "Зал",
      dataIndex: "area",
      key: "area",
      width: "20%",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => `${record.area.name} (${record.area.club.name})`
    },
    {
      title: "Тренер",
      dataIndex: "teacher",
      key: "teacher",
      width: "20%",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) =>
        getFullName(record.teacher.firstName, record.teacher.lastName)
    },
    {
      title: "Платная",
      dataIndex: "paid",
      key: "paid",
      align: "center",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => record.paid && <DollarCircleOutlined />
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
            onDelete={() => dispatch(deleteEvent(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <Table
      dataSource={events}
      columns={columns}
      loading={loading}
      rowSelection={rowSelection}
      rowClassName={(record) =>
        dayjs(record.startedAt).isBefore(dayjs()) ? "row-past-event" : ""
      }
    />
  );
};
