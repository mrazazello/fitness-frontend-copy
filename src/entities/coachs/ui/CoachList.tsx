import { Space, Table, Tag } from "antd";
import type { ColumnProps } from "antd/lib/table";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import useTableFilters from "@shared/hooks/useTableFilters";
import type { IFilterOption } from "@shared/models/filterOptions";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { ImagePreview } from "@shared/ui/ImagePreview/ImagePreview";
import getFullName from "@shared/utils/getFullName";

import { deleteCoach } from "../model/service/deleteCoach";
import type { ICoachListItem } from "../model/types/coachs";
import { coachTypes } from "../model/types/coachs";

type TProps = {
  coachs: ICoachListItem[];
  loading: boolean;
  clubsFilterOptions: IFilterOption[];
  onEdit: (code: string) => void;
};

export const CoachList = (props: TProps) => {
  const { coachs, loading, clubsFilterOptions, onEdit } = props;
  const dispatch = useAppDispatch();
  const { onTableChange, tableFilters, pageConfig } = useTableFilters();

  const columns: ColumnProps<ICoachListItem>[] = [
    {
      title: "Фаимилия Имя",
      dataIndex: "name",
      key: "name",
      width: "50%",
      render: (_, record) => getFullName(record.lastName, record.firstName)
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
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
      responsive: ["xxl", "xl", "lg", "md"]
    },
    {
      title: "Тип",
      dataIndex: "jobType",
      key: "jobType",
      width: "20%",
      responsive: ["xxl", "xl", "lg", "md"],
      render: (_, record) =>
        coachTypes.find((el) => el.value === record.jobType)?.label
    },
    {
      title: "Клуб",
      dataIndex: "clubs",
      key: "clubs",
      responsive: ["xxl", "xl", "lg", "md"],
      filters: clubsFilterOptions,
      onFilter: (value, record) =>
        record.clubs &&
        record.clubs.filter((item) => item.code === value).length > 0,
      filteredValue: tableFilters?.clubs,
      render: (_, record) =>
        record.clubs.map((item) => <Tag key={item.code}>{item.name}</Tag>)
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
            onDelete={() => dispatch(deleteCoach(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <Table
      dataSource={coachs}
      columns={columns}
      loading={loading}
      onChange={onTableChange}
      pagination={pageConfig}
    />
  );
};
