import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type {
  IProgrammCreateRequest,
  IProgrammCreateResponse
} from "../types/programms";

export const createProgramm = createAsyncThunk<
  IProgrammCreateResponse,
  IProgrammCreateRequest,
  IThunkConfig
>(
  "programms/createProgramm",
  async (request: IProgrammCreateRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post("/programs", JSON.stringify(request));
      dispatch(
        errorActions.addSuccessMessage({
          message: "Программа добавлена",
          type: "success"
        })
      );
      return response.data as IProgrammCreateResponse;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
