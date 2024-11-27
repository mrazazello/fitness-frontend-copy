import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IProductDetailResponse } from "../types/products";

export const fetchProduct = createAsyncThunk<
  IProductDetailResponse,
  string,
  IThunkConfig
>("products/fetchProduct", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/products/${coachCode}`);
    return response.data as IProductDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
