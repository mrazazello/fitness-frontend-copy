import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IOrderDetailResponse } from "../types/orders";

export const fetchOrder = createAsyncThunk<
  IOrderDetailResponse,
  string,
  IThunkConfig
>("orders/fetchOrder", async (orderCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/custom-orders/${orderCode}`);
    return response.data as IOrderDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
