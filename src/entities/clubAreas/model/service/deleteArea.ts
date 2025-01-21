import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

export const deleteArea = createAsyncThunk<null, string, IThunkConfig>(
  "clubs/deleteArea",
  async (areaCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/areas/${areaCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Зал удален",
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
