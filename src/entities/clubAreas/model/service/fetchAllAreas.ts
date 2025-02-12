import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IAllAreasResponse } from "../types/clubAreas";

export const fetchAllAreas = createAsyncThunk<
  IAllAreasResponse,
  undefined,
  IThunkConfig
>("clubs/fetchAllAreas", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/areas");
    return response.data as IAllAreasResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
