import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { defaultPageSize } from "@shared/constants/params";
import type { IPaginationParams } from "@shared/models/slice";

import type { IFormQueriesResponse } from "../types/formQueries";

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
