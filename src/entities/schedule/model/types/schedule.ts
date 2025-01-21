import type { IPagination } from "@shared/models/slice";
import { Dayjs } from "dayjs";

type dayOfWeekCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ListTeacherItem = {
  code: string;
  firstName: string;
  lastName: string;
  phone: string;
  socialTG: string;
  socialVK: string;
};

type ListAreaItem = {
  code: string;
  name: string;
  club: {
    code: string;
    name: string;
    contactPhone: string;
  };
};

type IProgramListItem = {
  code: string;
  name: string;
  description: string;
  duration: number;
  calories: number;
};

export interface IScheduleListItem {
  code: string;
  startedAt: string;
  paid: boolean;
  comment: string;

  teacher: ListTeacherItem;
  area: ListAreaItem;
  program: IProgramListItem;
}

export interface IScheduleListRequestParams {
  yearAndWeekNumber?: string;
  programCode: string[];
  teacherCode: string[];
  clubCode: string[];
  areaCode: string[];
  weekday: string[];
}

export interface IScheduleFilters {
  yearAndWeekNumber: null | string;
  startDate: null | string;
  finishDate: null | string;
  programCode: null | string[];
  teacherCode: null | string[];
  clubCode: null | string[];
  areaCode: null | string[];
  weekday: null | string[];
}

export interface IScheduleListResponse {
  schedule: {
    items: IScheduleListItem[];
    filter: IScheduleFilters;
    pagination: IPagination;
  };
}

export interface IScheduleCreateValues {
  startedAt: Dayjs;
  programCode: string;
  teacherCode: string;
  areaCode: string;
  paid: boolean;
  comment: string;
}

export interface IScheduleCreateArgs {
  startedAt: string;
  paid: boolean;
  comment: string;

  teacher: ListTeacherItem;
  area: ListAreaItem;
  program: IProgramListItem;
}

export interface IScheduleEditArgs extends IScheduleCreateArgs {
  code: string;
}

export type IScheduleCreateRequest = {
  startedAt: string;
  programCode: string;
  teacherCode: string;
  areaCode: string;
  paid: boolean;
  comment: string;
};

export interface IScheduleCreateResponse {
  code: string;
}

export interface IScheduleDetail {
  startedAt: string;
  programCode: string;
  teacherCode: string;
  areaCode: string;
  paid: boolean;
  comment: string;
}

export interface IScheduleDetailResponse {
  schedule: {
    code: string;
    time: string;
    startedAt: string;
    weekday: dayOfWeekCode;
    paid: boolean;
    comment: string;

    teacher: ListTeacherItem;
    area: ListAreaItem;
    program: IProgramListItem;
  };
}

export interface IScheduleCypyResponse {
  schedule: {
    createdItemsCodes: string[];
    notCreatedItemsCodes: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type IScheduleEditRequest = IScheduleCreateRequest;

export const convertScheduleCreateArgsToDetail = (
  args: IScheduleCreateArgs
): IScheduleDetail => {
  return {
    startedAt: args.startedAt,
    programCode: args.program.code,
    teacherCode: args.teacher.code,
    areaCode: args.area.code,
    paid: args.paid,
    comment: args.comment
  };
};
