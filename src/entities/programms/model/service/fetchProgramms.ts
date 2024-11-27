import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IProgrammsResponse } from "../types/programms";

export const fetchProgramms = createAsyncThunk<
  IProgrammsResponse,
  undefined,
  IThunkConfig
>("programms/fetchProgramms", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/programs");
    return response.data as IProgrammsResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
