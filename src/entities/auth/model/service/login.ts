import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { uninterceptedAxios } from "@shared/api/axios/unintercepted";

import type { ILoginResponse, IUserRequest } from "../types/auth";

export const login = createAsyncThunk<
  ILoginResponse,
  IUserRequest,
  IThunkConfig
>("auth/login", async (user: IUserRequest, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await uninterceptedAxios.post(
      "/auth/login",
      JSON.stringify(user)
    );
    return response.data as ILoginResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
