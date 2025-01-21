import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { uninterceptedAxios } from "@shared/api/axios/unintercepted";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IRefreshResponse } from "../types/auth";

export const refreshToken = createAsyncThunk<
  IRefreshResponse,
  undefined,
  IThunkConfig
>("auth/refreshToken", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await uninterceptedAxios.post("/auth/refresh", {
      withCredentials: true
    });
    return response.data as IRefreshResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
