import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IProductSelectListResponse } from "../types/products";

export const fetchAllProducts = createAsyncThunk<
  IProductSelectListResponse,
  undefined,
  IThunkConfig
>("products/fetchAllProducts", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/products/for-select");
    return response.data as IProductSelectListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
