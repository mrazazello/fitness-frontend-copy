import { Pagination, Space, Table } from "antd";
import { ColumnProps } from "antd/lib/table";

import { ImagePreview } from "@shared/ui/ImagePreview/ImagePreview";
import TooltipDate from "@shared/ui/TooltipDate/TooltipDate";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { IPagination } from "@shared/models/slice";
import { useAppDispatch } from "@app/index";

import { IOfferListItem } from "../model/types/offers";
import { deleteOffer } from "../model/service/deleteOffer";

type TProps = {
  offers?: IOfferListItem[];
  loading: boolean;
  pagination?: IPagination;
  onEdit: (code: string) => void;
  onPageChange: (page: number) => void;
};

export const OffersList = (props: TProps) => {
  const { offers, loading, pagination, onEdit, onPageChange } = props;
  const dispatch = useAppDispatch();

  const columns: ColumnProps<IOfferListItem>[] = [
    {
      title: "Метка",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) =>
        record?.photo ? (
          <ImagePreview
            photoCode={record.photo.code}
            imageSrc={record.photo.urlPath}
          />
        ) : null
    },
    {
      title: "Действует до",
      dataIndex: "endAt",
      key: "endAt",
      width: 130,
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) => <TooltipDate date={record.endAt} />
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
            onDelete={() => dispatch(deleteOffer(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={offers}
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
