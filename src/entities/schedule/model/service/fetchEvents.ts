import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import convertDayWeekArr from "@shared/utils/convertDayWeekArr";
import { IThunkConfig } from "@app/index";

import {
  IScheduleListRequestParams,
  IScheduleListResponse
} from "../types/schedule";

export const fetchEvents = createAsyncThunk<
  IScheduleListResponse,
  IScheduleListRequestParams,
  IThunkConfig
>("schedule/fetchEvents", async (params, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const fetchParams: IScheduleListRequestParams = {
    yearAndWeekNumber: params?.yearAndWeekNumber || undefined,
    programCode: params?.programCode,
    teacherCode: params?.teacherCode,
    areaCode: params?.areaCode,
    clubCode: params?.clubCode,
    weekday: convertDayWeekArr(params?.weekday)
  };
  try {
    const response = await axios.get("/schedule", {
      params: fetchParams
    });
    return response.data as IScheduleListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
