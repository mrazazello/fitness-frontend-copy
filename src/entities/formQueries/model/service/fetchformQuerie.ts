import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IFormQuerieDetailResponse } from "../types/formQueries";

export const fetchformQuerie = createAsyncThunk<
  IFormQuerieDetailResponse,
  string,
  IThunkConfig
>("formQueries/fetchformQuerie", async (formCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/client-queries/${formCode}`);
    return response.data as IFormQuerieDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
