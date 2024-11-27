import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { ICoachResponse } from "../types/coachs";

export const fetchCoach = createAsyncThunk<
  ICoachResponse,
  string,
  IThunkConfig
>("coachs/fetchCoach", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/teachers/${coachCode}`);
    return response.data as ICoachResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
