import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { defaultPageSize } from "@shared/constants/params";

import type { INewsListResponse } from "../types/news";

export const fetchNews = createAsyncThunk<
  INewsListResponse,
  number,
  IThunkConfig
>("news/fetchNews", async (page, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/news", {
      params: { page, pageSize: defaultPageSize }
    });
    return response.data as INewsListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
