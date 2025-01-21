import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IDocDetailResponse } from "../types/docs";

export const fetchDoc = createAsyncThunk<
  IDocDetailResponse,
  string,
  IThunkConfig
>("docs/fetchDoc", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/documents/${coachCode}`);
    return response.data as IDocDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
