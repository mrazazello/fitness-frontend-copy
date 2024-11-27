import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IStreetTypesResponse } from "../types/streetTypes";

export const fetchstreetTypes = createAsyncThunk<
  IStreetTypesResponse,
  undefined,
  IThunkConfig
>("streetTypes/fetchstreetTypes", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/address-types");
    return response.data as IStreetTypesResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
