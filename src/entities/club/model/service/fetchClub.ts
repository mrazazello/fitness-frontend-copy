import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IClubDetailResponse } from "../types/clubs";

export const fetchClub = createAsyncThunk<
  IClubDetailResponse,
  string,
  IThunkConfig
>("clubs/fetchClub", async (clubCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/clubs/${clubCode}/detail`);
    return response.data as IClubDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
