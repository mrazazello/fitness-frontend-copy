import { UploadFile } from "antd";

import { ICreatedFile } from "@shared/models/files";
import { IPhotoListItem } from "@shared/models/photo";

export enum CouachJobEnum {
  personal = "personal",
  group = "group"
}

export const coachTypes = [
  {
    label: "Персональный",
    value: CouachJobEnum.personal
  },
  {
    label: "Групповой",
    value: CouachJobEnum.group
  }
];

export interface ICoachListItem {
  code: string;
  firstName: string;
  lastName: string;
  phone: string;
  socialTG: string;
  socialVK: string;
  shortBio: string;
  photo: IPhotoListItem | null;
  jobType: CouachJobEnum;
  clubs: {
    code: string;
    name: string;
    contactPhone: string;
  }[];
}

export interface ICoachDetail {
  code: string;
  firstName: string;
  lastName: string;
  shortBio: string;
  description: string;
  phone: string;
  socialTG: string;
  socialVK: string;
  jobType: CouachJobEnum;
  clubCodes: string[];
  photo: IPhotoListItem;
  hideLastName: boolean;
}

export interface ICoachsResponse {
  teachers: { items: ICoachListItem[] };
}

export interface ICoachsCreateValues {
  firstName: string;
  lastName: string;
  phone: string;
  socialTG: string;
  socialVK: string;
  shortBio: string;
  description: string;
  photo: UploadFile<ICreatedFile>[];
  jobType: CouachJobEnum;
  clubCodes: string[];
  hideLastName: boolean;
}

export type ICoachsEditValues = ICoachsCreateValues;

export interface ICoachCreateArgs {
  firstName: string;
  lastName: string;
  phone: string;
  socialTG: string;
  socialVK: string;
  shortBio: string;
  description: string;
  photo: IPhotoListItem;
  jobType: CouachJobEnum;
  clubs: {
    code: string;
    name: string;
    contactPhone: string;
  }[];
  hideLastName: boolean;
}

export interface ICoachCreateRequest {
  firstName: string;
  lastName: string;
  phone: string;
  socialTG: string;
  socialVK: string;
  shortBio: string;
  description: string;
  photoCode: string;
  jobType: string;
  clubCodes: string[];
}

export interface ICoachCreateResponse {
  code: string;
}

export interface ICoachResponse {
  teacher: ICoachDetail;
}

export interface ICoachEditArgs extends ICoachCreateArgs {
  code: string;
}

export const covertICoachEditArgs2IcoachDetail = (
  coach: ICoachEditArgs
): ICoachDetail => {
  const clubCodes = coach.clubs.map((item) => item.code);
  return {
    code: coach.code,
    firstName: coach.firstName,
    lastName: coach.lastName,
    phone: coach.phone,
    socialTG: coach.socialTG,
    socialVK: coach.socialVK,
    shortBio: coach.shortBio,
    description: coach.description,
    jobType: coach.jobType,
    clubCodes,
    photo: coach.photo,
    hideLastName: coach.hideLastName
  };
};

export const covertICoachEditArgs2IcoachListItem = (
  coach: ICoachEditArgs
): ICoachListItem => {
  return {
    code: coach.code,
    firstName: coach.firstName,
    lastName: coach.lastName,
    phone: coach.phone,
    socialTG: coach.socialTG,
    socialVK: coach.socialVK,
    shortBio: coach.shortBio,
    jobType: coach.jobType,
    clubs: coach.clubs,
    photo: coach.photo
  };
};

export const covertICoachCreatedArgs2IcoachListItem = (
  createdCode: string,
  coach: ICoachCreateArgs
): ICoachListItem => {
  return {
    code: createdCode,
    firstName: coach.firstName,
    lastName: coach.lastName,
    phone: coach.phone,
    socialTG: coach.socialTG,
    socialVK: coach.socialVK,
    shortBio: coach.shortBio,
    jobType: coach.jobType,
    clubs: coach.clubs,
    photo: coach.photo
  };
};

export type ICoachEditRequest = ICoachCreateRequest;
