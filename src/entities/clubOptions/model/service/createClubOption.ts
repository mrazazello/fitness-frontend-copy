import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type {
  IClubOptionCreateRequest,
  IClubOptionCreateResponse
} from "../types/clubOptions";

export const createClubOption = createAsyncThunk<
  IClubOptionCreateResponse,
  IClubOptionCreateRequest,
  IThunkConfig
>(
  "clubs/createClubOption",
  async (request: IClubOptionCreateRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post("/options", JSON.stringify(request));
      dispatch(
        errorActions.addSuccessMessage({
          message: "Опция добавлена к клубу",
          type: "success"
        })
      );
      return response.data as IClubOptionCreateResponse;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
