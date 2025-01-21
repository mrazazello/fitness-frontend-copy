import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { defaultPageSize } from "@shared/constants/params";

import type { IOfferListResponse } from "../types/offers";

export const fetchOffers = createAsyncThunk<
  IOfferListResponse,
  number,
  IThunkConfig
>("offers/fetchOffers", async (page, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/special-offer", {
      params: { page, pageSize: defaultPageSize }
    });
    return response.data as IOfferListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
