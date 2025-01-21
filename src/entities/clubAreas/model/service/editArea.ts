import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IAreaEditRequest } from "../types/clubAreas";

export const editArea = createAsyncThunk<null, IAreaEditRequest, IThunkConfig>(
  "clubs/editArea",
  async (area: IAreaEditRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const areaCode = area.code;
      const request: PartialBy<IAreaEditRequest, "code"> = {
        ...area
      };
      delete request.code;
      const response = await axios.post(
        `/areas/${areaCode}`,
        JSON.stringify(request)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Зал обновлен",
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
