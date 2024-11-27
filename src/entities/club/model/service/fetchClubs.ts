import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IClubsResponse } from "../types/clubs";

export const fetchClubs = createAsyncThunk<
  IClubsResponse,
  undefined,
  IThunkConfig
>("clubs/fetchClubs", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/clubs");
    return response.data as IClubsResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
