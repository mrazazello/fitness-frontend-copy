import { UploadFile } from "antd";

import { ICreatedFile } from "@shared/models/files";
import { IPhotoListItem } from "@shared/models/photo";
import { IPagination } from "@shared/models/slice";

export interface INewsListItem {
  code: string;
  title: string;
  date: string;
  photo: IPhotoListItem | null;
}

export interface INewsDetail {
  code: string;
  title: string;
  date: string;
  content: string;
  photo: IPhotoListItem | null;
}

export interface INewsListResponse {
  news: {
    items: INewsListItem[];
    pagination: IPagination;
  };
}

export interface INewsCreateValues {
  title: string;
  date: Date;
  content: string;
  photo: UploadFile<ICreatedFile>[];
}
export type INewsEditValues = INewsCreateValues;

export interface INewsEditArgs {
  code: string;
  title: string;
  date: string;
  content: string;
  photo: IPhotoListItem;
}

export interface INewsCreateArgs {
  title: string;
  date: string;
  content: string;
  photo: IPhotoListItem;
}

export interface INewsCreateRequest {
  title: string;
  date: string;
  content: string;
  photoCode: string;
}

export interface INewsCreateResponse {
  code: string;
}

export interface INewsDetailResponse {
  news: INewsDetail;
}

export type INewsEditRequest = INewsCreateRequest;
