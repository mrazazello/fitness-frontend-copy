import { Pagination, Space, Table } from "antd";
import type { ColumnProps } from "antd/lib/table";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import type { IPagination } from "@shared/models/slice";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { ImagePreview } from "@shared/ui/ImagePreview/ImagePreview";
import TooltipDate from "@shared/ui/TooltipDate/TooltipDate";

import { deleteNews } from "../model/service/deleteNews";
import type { INewsListItem } from "../model/types/news";

type TProps = {
  news?: INewsListItem[];
  loading: boolean;
  pagination?: IPagination;
  onEdit: (code: string) => void;
  onPageChange: (page: number) => void;
};

export const NewsList = (props: TProps) => {
  const { news, loading, pagination, onEdit, onPageChange } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<INewsListItem>[] = [
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      render: (_, record) =>
        record?.photo ? (
          <ImagePreview
            photoCode={record.photo.code}
            imageSrc={record.photo.urlPath}
          />
        ) : null
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <TooltipDate date={record.date} />
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <EditEntityBtn onEdit={() => onEdit(record.code)} />
          <DeleteEntityBtn onDelete={() => dispatch(deleteNews(record.code))} />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={news}
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
