import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IPromocodeListResponse } from "../types/promocodes";

export const fetchPromocodes = createAsyncThunk<
  IPromocodeListResponse,
  number,
  IThunkConfig
>("promocodes/fetchPromocodes", async (page, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/promocodes?page=${page}`);
    return response.data as IPromocodeListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
