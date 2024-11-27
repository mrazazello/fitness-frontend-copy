import { UploadFile } from "antd";

import { ICreatedFile } from "@shared/models/files";
import { IPhotoListItem } from "@shared/models/photo";
import { IPagination } from "@shared/models/slice";

export interface IOfferListItem {
  code: string;
  name: string;
  title: string;
  endAt: string;
  photo: IPhotoListItem;
}

export interface IOfferDetail {
  code: string;
  name: string;
  title: string;
  endAt: string;
  photo: IPhotoListItem;
}

export interface IOfferListResponse {
  specialOffer: {
    items: IOfferListItem[];
    pagination: IPagination;
  };
}

export interface IOfferDetailResponse {
  specialOffer: IOfferDetail;
}

export interface IOfferEditValues {
  name: string;
  title: string;
  endAt: string;
  photo: UploadFile<ICreatedFile>[];
}

export interface IOfferEditArgs {
  code: string;
  name: string;
  title: string;
  endAt: string;
  photo: IPhotoListItem;
}

export interface IOfferEditRequest {
  name: string;
  title: string;
  endAt: string;
  photoCode: string;
}

export interface IOfferCreateArgs {
  name: string;
  title: string;
  endAt: string;
  photo: IPhotoListItem;
}

export interface IOfferCreateRequest {
  name: string;
  title: string;
  endAt: string;
  photoCode: string;
}
