import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

interface ISortParam {
  code: string;
  direction: "up" | "down";
}

export const sortProduct = createAsyncThunk<null, ISortParam, IThunkConfig>(
  "products/sortProduct",
  async (param: ISortParam, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `/products/${param.code}/${param.direction}`
      );
      return response.data as null;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
