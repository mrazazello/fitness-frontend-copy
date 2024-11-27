import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { defaultPageSize } from "@shared/constants/params";
import { IThunkConfig } from "@app/index";

import { IOfferListResponse } from "../types/offers";

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
