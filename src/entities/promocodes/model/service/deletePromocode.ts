import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

export const deletePromocode = createAsyncThunk<null, string, IThunkConfig>(
  "promocodes/deletePromocode",
  async (productCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/promocodes/${productCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Промокод удален",
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
