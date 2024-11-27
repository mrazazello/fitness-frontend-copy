import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import isStringArray from "@shared/utils/typeGueards";

type TFilters = Record<string, FilterValue | null>;

const useTableFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tableFilters, setTableFilters] = useState<TFilters>();
  const [pageConfig, setPageConfig] = useState<TablePaginationConfig>();

  useEffect(() => {
    setPageConfig({ current: Number(searchParams.get("page")) || 1 });
    searchParams.delete("page");

    const newFilters: TFilters = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams.entries()) {
      if (newFilters[key]) {
        newFilters[key]?.push(value);
      } else {
        newFilters[key] = [value];
      }
    }

    void setTableFilters(newFilters);
  }, [searchParams]);

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: TFilters
  ) => {
    const keys = Array.from(searchParams.keys());
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) searchParams.delete(key);

    Object.entries(filters).forEach(([key, values]) => {
      if (values && isStringArray(values)) {
        values.forEach((value) => {
          value && searchParams.append(key, value);
        });
      }
    });

    searchParams.set("page", pagination?.current?.toString() || "1");
    navigate(`?${searchParams.toString()}`);
  };

  const onPageChange = (page: number) => {
    searchParams.set("page", page.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return { onTableChange, onPageChange, tableFilters, pageConfig };
};

export default useTableFilters;
