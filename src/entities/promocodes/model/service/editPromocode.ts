import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PartialBy } from "@shared/models/slice";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { IPromocodeEditRequest } from "../types/promocodes";

export const editPromocode = createAsyncThunk<
  null,
  IPromocodeEditRequest,
  IThunkConfig
>(
  "promocodes/editPromocode",
  async (product: IPromocodeEditRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const promocodeCode = product.code;
      const request: PartialBy<IPromocodeEditRequest, "code"> = {
        ...product
      };
      delete request.code;
      const response = await axios.post(
        `/promocodes/${promocodeCode}`,
        JSON.stringify(product)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Промокод обновлен",
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
