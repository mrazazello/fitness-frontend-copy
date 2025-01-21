import type { IPagination } from "@shared/models/slice";

export interface IFormQueriesListItem {
  code: string;
  createdAt: string;
  type: string;
  name: string;
  phone: string;
  club: {
    code: string;
    name: string;
    contactPhone: string;
  };
  note: string;
  specialOffer: {
    code: string;
    name: string;
    title: string;
    endAt: string;
  };
}

export interface IFormQueriesResponse {
  clientQueries: {
    items: IFormQueriesListItem[];
    pagination: IPagination;
  };
}

export type IFormQuerieDetail = IFormQueriesListItem;

export interface IFormQuerieDetailResponse {
  clientQuery: IFormQuerieDetail;
}
