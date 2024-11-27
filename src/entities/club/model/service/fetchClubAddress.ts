import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IClubsAddressResponse } from "../types/clubs";

export const fetchClubAddress = createAsyncThunk<
  IClubsAddressResponse,
  string,
  IThunkConfig
>("clubs/fetchClubAddress", async (clubCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/clubs/${clubCode}/address`);
    return response.data as IClubsAddressResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
