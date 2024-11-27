import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";

import { IDocsListResponse } from "../types/docs";

export const fetchDocs = createAsyncThunk<
  IDocsListResponse,
  undefined,
  IThunkConfig
>("docs/fetchDocs", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get("/documents");
    return response.data as IDocsListResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
