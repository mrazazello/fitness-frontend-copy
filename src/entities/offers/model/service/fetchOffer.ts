import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IOfferDetailResponse } from "../types/offers";

export const fetchOffer = createAsyncThunk<
  IOfferDetailResponse,
  string,
  IThunkConfig
>("offers/fetchOffer", async (coachCode, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`/special-offer/${coachCode}`);
    return response.data as IOfferDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
