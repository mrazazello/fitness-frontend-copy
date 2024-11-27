import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { IPaginationParams } from "@shared/models/slice";
import { defaultPageSize } from "@shared/constants/params";
import { IThunkConfig } from "@app/index";

import { IOrdersResponse } from "../types/orders";

export const fetchOrders = createAsyncThunk<
  IOrdersResponse,
  IPaginationParams,
  IThunkConfig
>("orders/fetchOrders", async (pagination, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "/custom-orders",
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize || defaultPageSize
    }
  };
  try {
    const response = await axios(options);
    return response.data as IOrdersResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
