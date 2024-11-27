import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { INewsDetailResponse } from "../types/news";

export const fetchNewsDetail = createAsyncThunk<
  INewsDetailResponse,
  string,
  IThunkConfig
>("news/fetchNewsDetail", async (newsCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/news/${newsCode}`);
    return response.data as INewsDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
