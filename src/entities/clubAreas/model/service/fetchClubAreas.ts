import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IClubsAreasResponse } from "../types/clubAreas";

export const fetchClubAreas = createAsyncThunk<
  IClubsAreasResponse,
  string,
  IThunkConfig
>("clubs/fetchClubAreas", async (clubCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/clubs/${clubCode}/areas`);
    return response.data as IClubsAreasResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
