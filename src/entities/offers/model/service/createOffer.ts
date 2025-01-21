import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { IProductCreateResponse } from "@entities/products/model/types/products";
import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IOfferCreateArgs, IOfferCreateRequest } from "../types/offers";

export const createOffer = createAsyncThunk<
  IProductCreateResponse,
  IOfferCreateArgs,
  IThunkConfig
>("offers/createOffer", async (args: IOfferCreateArgs, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const backendRequest: IOfferCreateRequest = {
      name: args.name,
      title: args.title,
      endAt: args.endAt,
      photoCode: args.photo.code
    };
    const response = await axios.post(
      "/special-offer",
      JSON.stringify(backendRequest)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Спец-предложение добавлено",
        type: "success"
      })
    );
    return response.data as IProductCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
