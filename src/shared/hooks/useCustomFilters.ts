import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import isStringArray from "@shared/utils/typeGueards";

type TFilterValue = Array<string> | string | undefined;

const useCustomFilters = <T extends string>() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Record<T, TFilterValue>>();

  useEffect(() => {
    const res: Record<string, TFilterValue> = {};
    const keys = Array.from(searchParams.keys());

    for (const key of keys) {
      const params = searchParams.getAll(key);
      if (params) res[key] = params;
    }

    setFilters(res);
  }, [searchParams]);

  const onFiltersChange = useCallback(
    (filtersArg: Record<T, TFilterValue>) => {
      const keys = Array.from(searchParams.keys());
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) searchParams.delete(key);

      Object.entries(filtersArg).forEach(([key, values]) => {
        if (values && Array.isArray(values) && isStringArray(values)) {
          values.forEach((value) => {
            if (value) searchParams.append(key, value);
          });
        } else {
          if (typeof values === "string") searchParams.append(key, values);
        }
      });

      navigate(`?${searchParams.toString()}`);
    },
    [searchParams]
  );

  const resetFilters = useCallback(() => {
    navigate("");
  }, []);

  return { filters, onFiltersChange, resetFilters };
};

export default useCustomFilters;
