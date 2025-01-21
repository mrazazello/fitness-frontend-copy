import type { IPagination } from "@shared/models/slice";

export interface ISliderListItem {
  code: string;
  title: string;
  subTitle: string;
  date: string;
  active: boolean;
  buttonTitle: string;
  buttonLink: string;
}

export interface ISliderListResponse {
  sliders: {
    items: ISliderListItem[];
    pagination: IPagination;
  };
}

export interface ISliderFormDetail {
  code: string;
  title: string;
  subTitle: string;
  buttonTitle: string;
  buttonLink: string;
}

export interface ISliderDetail {
  code: string;
  title: string;
  subTitle: string;
  //   date: string;
  buttonTitle: string;
  buttonLink: string;
  //   active: boolean;
}

export interface ISliderDetailResponse {
  slider: ISliderDetail;
}

export interface ISliderEditValues {
  title: string;
  subTitle: string;
  buttonTitle: string;
  buttonLink: string;
}

export interface ISliderCreateResponse {
  code: string;
  slider: ISliderDetail;
}

export type ISliderCreateRequest = ISliderEditValues;

export interface ISliderEditRequest extends ISliderCreateRequest {
  code: string;
}
