import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IDocDetailResponse } from "../types/docs";

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
