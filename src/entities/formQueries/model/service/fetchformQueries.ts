import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { IPaginationParams } from "@shared/models/slice";
import { defaultPageSize } from "@shared/constants/params";
import { IThunkConfig } from "@app/index";

import { IFormQueriesResponse } from "../types/formQueries";

export const fetchformQueries = createAsyncThunk<
  IFormQueriesResponse,
  IPaginationParams,
  IThunkConfig
>("formQueries/fetchformQueries", async (pagination, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "/client-queries",
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize || defaultPageSize
    }
  };
  try {
    const response = await axios(options);
    return response.data as IFormQueriesResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
