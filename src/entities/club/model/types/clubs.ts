import { UploadFile } from "antd";

import { ICreatedFile } from "@shared/models/files";
import { IPhotoListItem } from "@shared/models/photo";

export interface IClubAddress {
  city: string;
  streetType: string;
  street: string;
  house: string;
  entrance: string;
  longtitude: string | null;
  latitude: string | null;
}

export interface IClubListItem {
  code: string;
  name: string;
  contactPhone: string;
}

export interface IClubsResponse {
  items: IClubListItem[];
}

export interface IClubDetail {
  clubName: string;
  title: string;
  description: string;
  timetable: string;
  timetableNote: string;
  phone: string;
  email: string;
  clubAddress?: IClubAddress;
}

export interface IClubDetailResponse {
  detail: IClubDetail;
}

export interface IClubEditRequest {
  code: string;
  clubName: string;
  title: string;
  description: string;
  timetable: string;
  timetableNote: string;
  phone: string;
  email: string;
}

export interface IClubsAddressResponse {
  address: IClubAddress;
}

export interface IClubEditValues {
  clubName: string;
  title: string;
  description: string;
  timetable: string;
  timetableNote: string;
  phone: string;
  email: string;
}

export interface IClubAddressEditRequest {
  code: string;
  city: string;
  streetType: string;
  street: string;
  house: string;
  entrance: string;
  longtitude: string;
  latitude: string;
}

export interface IClubEditAddressValues {
  city: string;
  streetType: string;
  street: string;
  house: string;
  entrance: string;
  longtitude: string;
  latitude: string;
}

export interface IClubsPhotosResponse {
  photos: { items: IPhotoListItem[] };
}

export interface IClubsEditPhotosArgs {
  code: string;
  photos: IPhotoListItem[];
}

export interface IClubsEditPhotosRequest {
  items: string[];
}

export interface IClubEditPhotosValues {
  photo: UploadFile<ICreatedFile>[];
}
