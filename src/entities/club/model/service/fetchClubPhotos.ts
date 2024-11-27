import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IClubsPhotosResponse } from "../types/clubs";

export const fetchClubPhotos = createAsyncThunk<
  IClubsPhotosResponse,
  string,
  IThunkConfig
>("clubs/fetchClubPhotos", async (code, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/clubs/${code}/photos`);
    return response.data as IClubsPhotosResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
