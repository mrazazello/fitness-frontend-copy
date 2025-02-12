import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IOfferEditArgs, IOfferEditRequest } from "../types/offers";

export const editOffer = createAsyncThunk<null, IOfferEditArgs, IThunkConfig>(
  "offers/editOffer",
  async (offerArgs: IOfferEditArgs, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { code } = offerArgs;
      const request: PartialBy<IOfferEditArgs, "code"> = {
        ...offerArgs
      };
      delete request.code;
      const backendRequest: IOfferEditRequest = {
        ...request,
        photoCode: request.photo.code
      };
      const response = await axios.post(
        `/special-offer/${code}`,
        JSON.stringify(backendRequest)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Спец-предложение обновлено",
          type: "success"
        })
      );
      return response.data as null;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
