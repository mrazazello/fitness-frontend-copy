import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IClubsOptionsResponse } from "../types/clubOptions";

export const fetchClubOptions = createAsyncThunk<
  IClubsOptionsResponse,
  string,
  IThunkConfig
>("clubs/fetchClubOptions", async (clubCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/clubs/${clubCode}/options`);
    return response.data as IClubsOptionsResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
