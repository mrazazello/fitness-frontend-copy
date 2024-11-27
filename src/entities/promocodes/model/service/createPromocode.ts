import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
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
