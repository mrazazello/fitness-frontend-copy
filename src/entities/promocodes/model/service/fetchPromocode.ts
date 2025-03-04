import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IPromocodeDetailResponse } from "../types/promocodes";

export const fetchPromocode = createAsyncThunk<
  IPromocodeDetailResponse,
  string,
  IThunkConfig
>("promocodes/fetchPromocode", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/promocodes/${coachCode}`);
    return response.data as IPromocodeDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
