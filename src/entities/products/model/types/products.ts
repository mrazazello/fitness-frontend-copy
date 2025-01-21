import type { IPagination } from "@shared/models/slice";

export interface IProductListItem {
  code: string;
  title: string;
  oldPrice: string;
  price: string;
  active: boolean;
  promocode: boolean;
  clubs: {
    code: string;
    name: string;
    contactPhone: string;
  }[];
}

export interface IProductSelectItem {
  code: string;
  title: string;
  active: boolean;
}

export interface IProductDetail {
  code: string;
  active: boolean;
  title: string;
  oldPrice: string;
  price: string;
  promocode: boolean;
  clubs: {
    code: string;
    name: string;
    contactPhone: string;
  }[];
  description: string;
  dayPromo: boolean;
}

export interface IProductListResponse {
  products: {
    items: IProductListItem[];
    pagination?: IPagination;
    filter: {
      clubCode: string[];
    };
  };
}

export interface IProductSelectListResponse {
  products: {
    items: IProductSelectItem[];
  };
}

export interface IProductDetailResponse {
  product: IProductDetail;
}

export interface IProductEditValues {
  title: string;
  active: boolean;
  oldPrice: string;
  price: string;
  clubCodes: string[];
  description: string;
  promocode: boolean;
  dayPromo: boolean;
}

export type fetchProductsParams = {
  page: number;
  pageSize?: number;
  clubCodes?: string[];
};

export type IProductEditRequestArgs = IProductDetail;

export type IProductEditRequest = IProductEditValues;

export type IProductCreateRequest = IProductEditValues;

export interface IProductCreateResponse {
  code: string;
}
