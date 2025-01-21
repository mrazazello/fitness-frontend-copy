import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { ISliderDetailResponse } from "../types/sliders";

export const fetchSlider = createAsyncThunk<
  ISliderDetailResponse,
  string,
  IThunkConfig
>("sliders/fetchSlider", async (code, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/sliders/${code}`);
    return response.data as ISliderDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
