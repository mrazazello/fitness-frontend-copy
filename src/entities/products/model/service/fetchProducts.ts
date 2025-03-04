import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { defaultPageSize } from "@shared/constants/params";

import type {
  IProductListResponse,
  fetchProductsParams
} from "../types/products";

export const fetchProducts = createAsyncThunk<
  IProductListResponse,
  fetchProductsParams,
  IThunkConfig
>("products/fetchProducts", async (params, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/products", {
      params: {
        page: params.page,
        pageSize: params.pageSize || defaultPageSize,
        clubCode: params.clubCodes
      }
    });
    return response.data as IProductListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
