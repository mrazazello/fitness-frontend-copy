import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IRefreshResponse } from "../types/auth";

export const logOut = createAsyncThunk<
  IRefreshResponse,
  undefined,
  IThunkConfig
>("auth/logOut", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post("/auth/logout");
    return response.data as IRefreshResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
