import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IProgrammResponse } from "../types/programms";

export const fetchProgramm = createAsyncThunk<
  IProgrammResponse,
  string,
  IThunkConfig
>("programms/fetchProgramm", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/programs/${coachCode}`);
    return response.data as IProgrammResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
