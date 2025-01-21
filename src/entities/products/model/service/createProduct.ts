import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type {
  IProductCreateRequest,
  IProductCreateResponse
} from "../types/products";

export const createProduct = createAsyncThunk<
  IProductCreateResponse,
  IProductCreateRequest,
  IThunkConfig
>(
  "products/createProduct",
  async (request: IProductCreateRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post("/products", JSON.stringify(request));
      dispatch(
        errorActions.addSuccessMessage({
          message: "Акция добавлена",
          type: "success"
        })
      );
      return response.data as IProductCreateResponse;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
