import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IDocEditRequest } from "../types/docs";

export const editDoc = createAsyncThunk<null, IDocEditRequest, IThunkConfig>(
  "docs/editDoc",
  async (doc: IDocEditRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const docCode = doc.code;
      const request: PartialBy<IDocEditRequest, "code"> = {
        ...doc
      };
      delete request.code;
      const response = await axios.post(
        `/documents/${docCode}`,
        JSON.stringify(request)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Документ обновлен",
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
