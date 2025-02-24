import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { defaultPageSize } from "@shared/constants/params";

import type { ISliderListResponse } from "../types/sliders";

export const fetchSliders = createAsyncThunk<
  ISliderListResponse,
  number,
  IThunkConfig
>("sliders/fetchSliders", async (page, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/sliders", {
      params: { page, pageSize: defaultPageSize }
    });
    return response.data as ISliderListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
