import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

export const deleteOffer = createAsyncThunk<null, string, IThunkConfig>(
  "offers/deleteOffer",
  async (productCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/special-offer/${productCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Спец-предложение удалено",
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
