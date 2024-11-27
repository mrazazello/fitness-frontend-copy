import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IOptionIconsResponse } from "../types/options";

export const fetchOptionIcons = createAsyncThunk<
  IOptionIconsResponse,
  undefined,
  IThunkConfig
>("optionIcons/fetchOptionIcons", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/option-icons");
    return response.data as IOptionIconsResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});