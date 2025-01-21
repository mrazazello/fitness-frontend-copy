import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IClubAddressEditRequest } from "../types/clubs";

export const editAddress = createAsyncThunk<
  null,
  IClubAddressEditRequest,
  IThunkConfig
>(
  "clubs/editAddress",
  async (clubAddress: IClubAddressEditRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const clubCode = clubAddress.code;
      const request: PartialBy<IClubAddressEditRequest, "code"> = {
        ...clubAddress
      };
      delete request.code;
      const response = await axios.post(
        `/clubs/${clubCode}/address`,
        JSON.stringify(request)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Адрес обновлен",
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
