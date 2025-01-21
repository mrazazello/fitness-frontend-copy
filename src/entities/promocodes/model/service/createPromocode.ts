import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type {
  IPromocodeCreateRequest,
  IPromocodeCreateResponse
} from "../types/promocodes";

export const createPromocode = createAsyncThunk<
  IPromocodeCreateResponse,
  IPromocodeCreateRequest,
  IThunkConfig
>(
  "promocodes/createPromocode",
  async (request: IPromocodeCreateRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post("/promocodes", JSON.stringify(request));
      dispatch(
        errorActions.addSuccessMessage({
          message: "Промокод добавлен",
          type: "success"
        })
      );
      return response.data as IPromocodeCreateResponse;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
