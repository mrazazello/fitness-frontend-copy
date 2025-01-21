import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IScheduleCypyResponse } from "../types/schedule";

export const copyEvents = createAsyncThunk<
  IScheduleCypyResponse,
  string[],
  IThunkConfig
>("schedule/copyEvents", async (codes: string[], thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const request = {
    itemsCodes: codes
  };
  try {
    const response = await axios.post(
      "/schedule/copy_by_codes",
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "События скопированы",
        type: "success"
      })
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
