import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PartialBy } from "@shared/models/slice";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { IAreaEditRequest } from "../types/clubAreas";

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
