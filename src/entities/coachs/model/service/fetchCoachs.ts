import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { ICoachsResponse } from "../types/coachs";

export const fetchCoachs = createAsyncThunk<
  ICoachsResponse,
  undefined,
  IThunkConfig
>("coachs/fetchCoachs", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/teachers");
    return response.data as ICoachsResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
