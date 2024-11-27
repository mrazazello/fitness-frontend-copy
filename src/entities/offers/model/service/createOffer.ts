import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IProductCreateResponse } from "@entities/products/model/types/products";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { IOfferCreateArgs, IOfferCreateRequest } from "../types/offers";

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