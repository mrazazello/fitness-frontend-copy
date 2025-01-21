import type { FilterValue, Key, SortOrder } from "antd/lib/table/interface";

export interface IPagination {
  total: number;
  currentPage: number;
  pageSize: number;
  pages: number;
  offset: number;
  from: number;
  to: number;
}

export interface IPaginationParams {
  page: number;
  pageSize?: number;
}

export type FilterType = Record<string, FilterValue | null>;

export interface ISorterRusult {
  order?: SortOrder;
  field?: Key | Key[];
  columnKey?: Key;
}

export interface IEntitiesState {
  loading: "idle" | "loading" | "failed";
  ids?: number[];
  pagination?: IPagination;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
