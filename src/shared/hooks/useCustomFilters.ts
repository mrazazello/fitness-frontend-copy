import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import isStringArray from "@shared/utils/typeGueards";

type TFilterValue = Array<string> | string | undefined;

const useCustomFilters = <T extends string>() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Record<T, TFilterValue>>();

  const onFiltersChange = (filtersArg: Record<T, TFilterValue>) => {
    setFilters(filtersArg);

    const keys = Array.from(searchParams.keys());
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) searchParams.delete(key);

    Object.entries(filtersArg).forEach(([key, values]) => {
      if (values && Array.isArray(values) && isStringArray(values)) {
        values.forEach((value) => {
          value && searchParams.append(key, value);
        });
      } else {
        typeof values === "string" && searchParams.append(key, values);
      }
    });

    navigate(`?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    setFilters(undefined);
    navigate("");
  };

  return { filters, onFiltersChange, resetFilters };
};

export default useCustomFilters;
