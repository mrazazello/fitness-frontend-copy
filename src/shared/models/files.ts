import type { UploadChangeParam, UploadFile } from "antd/lib/upload";

import backendPaths from "@shared/constants/backendPaths";

import type { IPhotoListItem } from "./photo";

export interface ICreatedFile {
  code: string;
  filename: string;
  urlPath: string;
  mimeType: string;
  extension: string;
  imageWidth: number;
  imageHeight: number;
  originalFilename: string;
}

export interface ICreateFileResponse {
  file: ICreatedFile;
}

export interface IUploadwithResponse extends UploadChangeParam {
  response: { file: ICreateFileResponse };
}

export const createInitUploadConfig = (
  photo: IPhotoListItem | IPhotoListItem[] | null | undefined
): UploadFile<IPhotoListItem>[] | undefined => {
  if (!photo) return undefined;
  if (!Array.isArray(photo)) {
    return [
      {
        uid: photo.urlPath,
        name: photo.urlPath,
        url: backendPaths.BACKEND_FILES_URL(photo.urlPath),
        response: photo
      }
    ];
  }
  return photo.map((item) => {
    return {
      uid: item.urlPath,
      name: item.urlPath,
      url: backendPaths.BACKEND_FILES_URL(item.urlPath),
      response: item
    };
  });
};

export const convertIFileResponseToPhotoListItem = (
  response: ICreatedFile
): IPhotoListItem => {
  return {
    code: response.code,
    urlPath: response.urlPath,
    imageWidth: response.imageWidth,
    imageHeight: response.imageHeight
  };
};

export const convertIFileResponseToPhotoListItems = (
  response: UploadFile<ICreatedFile>[]
): IPhotoListItem[] => {
  const result: IPhotoListItem[] = [];
  response.forEach((item) => {
    if (item.response)
      result.push({
        code: item.response.code,
        urlPath: item.response.urlPath,
        imageWidth: item.response.imageWidth,
        imageHeight: item.response.imageHeight
      });
  });
  return result;
};

export const convertPhotoListItemoPhotoCodes = (
  response: IPhotoListItem[]
): string[] => {
  const result: string[] = [];
  response.forEach((item) => {
    if (item.code) result.push(item.code);
  });
  return result;
};
