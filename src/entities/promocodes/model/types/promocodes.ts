import type { IPagination } from "@shared/models/slice";

export type PromocodeDiscountType = "percent" | "absolute";

export interface IPromocodeListItem {
  code: string;
  active: boolean;
  secret: string;
  type: PromocodeDiscountType;
  discount: number;
  note: string;
  startAt: string;
  endAt: string;
  products: [
    {
      code: string;
      title: string;
      price: string;
      active: boolean;
      promocode: boolean;
    }
  ];
}

export interface IPromocodeDetail {
  code: string;
  active: boolean;
  secret: string;
  type: PromocodeDiscountType;
  discount: number;
  note: string;
  startAt: string;
  endAt: string;
  productCodes: string[];
}

export interface IPromocodeListResponse {
  promocodes: {
    items: IPromocodeListItem[];
    pagination: IPagination;
  };
}

export interface IPromocodeDetailResponse {
  promocode: IPromocodeDetail;
}

export interface IPromocodeEditValues {
  active: boolean;
  secret: string;
  type: PromocodeDiscountType;
  discount: number;
  note: string;
  startAt: string;
  endAt: string;
  productCodes: string[];
}

export interface IPromocodeEditRequest extends IPromocodeEditValues {
  code: string;
}

export type IPromocodeCreateValues = IPromocodeEditValues;

export type IPromocodeCreateRequest = IPromocodeEditValues;

export interface IPromocodeCreateResponse {
  code: string;
}
