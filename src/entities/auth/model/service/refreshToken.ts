import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { axiosWithCredentials } from "@shared/api/axios/axios";

import { IRefreshResponse } from "../types/auth";

export const refreshToken = createAsyncThunk<
  IRefreshResponse,
  undefined,
  IThunkConfig
>("auth/refreshToken", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axiosWithCredentials.post("/auth/refresh");
    return response.data as IRefreshResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
