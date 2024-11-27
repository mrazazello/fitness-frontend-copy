import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
  IClubAreaCreateRequest,
  IClubAreaCreateResponse
} from "../types/clubAreas";

export const createClubArea = createAsyncThunk<
  IClubAreaCreateResponse,
  IClubAreaCreateRequest,
  IThunkConfig
>("clubs/createClubArea", async (request: IClubAreaCreateRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const response = await axios.post("/areas", JSON.stringify(request));
    dispatch(
      errorActions.addSuccessMessage({
        message: "Зал добавлен",
        type: "success"
      })
    );
    return response.data as IClubAreaCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
