import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IPromocodeListResponse } from "../types/promocodes";

export const fetchPromocodes = createAsyncThunk<
  IPromocodeListResponse,
  undefined,
  IThunkConfig
>("promocodes/fetchPromocodes", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/promocodes");
    return response.data as IPromocodeListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
