import { Button, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import { coachsSelectors, fetchCoachs } from "@entities/coachs";
import { fetchProgramms, programmsSelectors } from "@entities/programms";
import { getScheduleFilters } from "@entities/schedule";
import dayOfWeek from "@shared/constants/daysOfWeek";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import useCustomFilters from "@shared/hooks/useCustomFilters";
import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";
import getFullName from "@shared/utils/getFullName";
import { fetchAllAreas, useAreasByClub } from "@entities/clubAreas";

export const FiltersBlock = () => {
  const dispatch = useAppDispatch();
  const { filters, onFiltersChange, resetFilters } = useCustomFilters();

  useEffect(() => {
    dispatch(fetchCoachs());
    dispatch(fetchProgramms());
    dispatch(fetchAllAreas());
  }, []);

  const storeFilters = useAppSelector(getScheduleFilters);
  const programmsFilter = useAppSelector(programmsSelectors.selectAll).map(
    (el) => ({ label: el.name, value: el.code })
  );
  const areasGoupped = useAreasByClub();

  const coachsFilter =
    useAppSelector(coachsSelectors.selectAll)
      .map((item) => ({
        key: item.code,
        label: getFullName(item.firstName, item.lastName),
        value: item.code
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  return (
    <Space align="center" wrap>
      <AppDatePicker
        onChange={(_, stringValue) =>
          onFiltersChange({
            ...filters,
            yearAndWeek: [stringValue]
          })
        }
        value={
          storeFilters?.startDate ? dayjs(storeFilters?.startDate) : undefined
        }
        picker="week"
      />
      <Select
        options={dayOfWeek.map((el) => ({
          ...el,
          value: el.value.toString()
        }))}
        style={{ width: 120 }}
        allowClear
        placeholder="День недели"
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            weekday: value
          })
        }
        value={storeFilters?.weekday || undefined}
      />
      <Select
        options={programmsFilter}
        style={{ width: 160 }}
        allowClear
        placeholder="Программа"
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        mode="multiple"
        maxTagCount="responsive"
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            programm: [...value]
          })
        }
        value={storeFilters?.programCode || undefined}
      />
      <Select
        options={areasGoupped}
        style={{ width: 160 }}
        allowClear
        placeholder="Зал и Клуб"
        maxTagCount="responsive"
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            area: value
          })
        }
        value={storeFilters?.areaCode || undefined}
      />
      <Select
        options={coachsFilter}
        style={{ width: 160 }}
        allowClear
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        placeholder="Тренер"
        maxTagCount="responsive"
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            teacher: value
          })
        }
        value={storeFilters?.teacherCode || undefined}
      />
      <Button onClick={resetFilters}>Сбросить</Button>
    </Space>
  );
};
