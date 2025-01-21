import type { IPagination } from "@shared/models/slice";

export interface IOrdersListItem {
  code: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  paidAt: string;
  status: string;
  amount: string;
  productCode: string;
  productName: string;
  productPrice: string;
  promocode: string;
  promocodeDiscount: number;
  gift: boolean;
  gifterFirstName: string;
  gifterLastName: string;
  gifterPhone: string;
  clubList: {
    items: [
      {
        code: string;
        name: string;
        title: string;
        contactPhone: string;
      }
    ];
  };
}

export interface IOrdersResponse {
  customOrders: {
    items: IOrdersListItem[];
    pagination: IPagination;
  };
}

export type IOrderDetail = IOrdersListItem;

export interface IOrderDetailResponse {
  customOrder: IOrderDetail;
}
