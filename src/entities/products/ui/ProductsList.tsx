import { Pagination, Space, Switch, Table, Tag } from "antd";
import { ColumnProps } from "antd/lib/table";

import { IPagination } from "@shared/models/slice";
import { useAppDispatch, useAppSelector } from "@app/index";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { IFilterOption } from "@shared/models/filterOptions";
import { Sorter } from "@shared/ui/Sorter/Sorter";
import useTableFilters from "@shared/hooks/useTableFilters";

import { IProductListItem } from "../model/types/products";
import { deleteProduct } from "../model/service/deleteProduct";
import { getProductsFilters } from "../model/selectors/productsSelectors";

type TProps = {
  products?: IProductListItem[];
  loading: boolean;
  pagination?: IPagination;
  clubsFilterOptions: IFilterOption[];
  onEdit: (code: string) => void;
  onSort: (code: string, direction: "up" | "down") => void;
};

export const ProductsList = (props: TProps) => {
  const { products, loading, pagination, clubsFilterOptions, onEdit, onSort } =
    props;
  const dispatch = useAppDispatch();
  const { onTableChange, onPageChange } = useTableFilters();
  const productFilters = useAppSelector(getProductsFilters);

  const columns: ColumnProps<IProductListItem>[] = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Клуб",
      dataIndex: "club",
      key: "clubs",
      responsive: ["xxl", "xl", "lg", "md"],
      filters: clubsFilterOptions,
      filteredValue: productFilters.clubs,
      render: (_, record) =>
        record.clubs.map((club) => <Tag key={club.code}>{club.name}</Tag>)
    },
    {
      title: "Активна",
      dataIndex: "active",
      responsive: ["xxl", "xl", "lg", "md"],
      key: "active",
      render: (_, record) => (
        <Switch size="small" checked={record.active} disabled />
      )
    },
    {
      title: "Переместить",
      dataIndex: "moove",
      responsive: ["xxl", "xl", "lg", "md"],
      key: "moove",
      render: (_, record) => <Sorter code={record.code} onSort={onSort} />
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
            onDelete={() => dispatch(deleteProduct(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        onChange={onTableChange}
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
