import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IScheduleDetailResponse } from "../types/schedule";

export const fetchEvent = createAsyncThunk<
  IScheduleDetailResponse,
  string,
  IThunkConfig
>("schedule/fetchEvent", async (eventCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/schedule/${eventCode}`);
    return response.data as IScheduleDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
