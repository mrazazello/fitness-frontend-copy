import { Pagination, Space, Switch, Table } from "antd";
import { ColumnProps } from "antd/lib/table";

import { IPagination } from "@shared/models/slice";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { useAppDispatch } from "@app/index";

import { ISliderListItem } from "../model/types/sliders";
import { deleteSlider } from "../model/service/deleteSlider";

type TProps = {
  sliders?: ISliderListItem[];
  loading: boolean;
  pagination?: IPagination;
  onPageChange: (page: number) => void;
  onEdit: (code: string) => void;
  onToggle: (record: ISliderListItem) => void;
};

export const SlidersList = (props: TProps) => {
  const { sliders, loading, pagination, onPageChange, onEdit, onToggle } =
    props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<ISliderListItem>[] = [
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
      width: "100%"
    },
    {
      title: "Активен",
      dataIndex: "active",
      key: "active",
      width: "100",
      align: "center",
      render: (_, record) => (
        <Switch
          size="small"
          checked={record.active}
          onChange={() => onToggle(record)}
        />
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
            onDelete={() => dispatch(deleteSlider(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={sliders}
        columns={columns}
        pagination={false}
        loading={loading}
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
