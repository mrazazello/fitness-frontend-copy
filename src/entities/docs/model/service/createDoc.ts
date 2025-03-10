import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { IDocCreateRequest, IDocCreateResponse } from "../types/docs";

export const createDoc = createAsyncThunk<
  IDocCreateResponse,
  IDocCreateRequest,
  IThunkConfig
>("docs/createDoc", async (request: IDocCreateRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const response = await axios.post("/documents", JSON.stringify(request));
    dispatch(
      errorActions.addSuccessMessage({
        message: "Документ добавлен",
        type: "success"
      })
    );
    return response.data as IDocCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
