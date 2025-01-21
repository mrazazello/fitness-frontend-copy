import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IOptionEditRequest } from "../types/clubOptions";

export const editOption = createAsyncThunk<
  null,
  IOptionEditRequest,
  IThunkConfig
>("clubs/editOption", async (option: IOptionEditRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const optionCode = option.code;
    const request: PartialBy<IOptionEditRequest, "code"> = {
      ...option
    };
    delete request.code;
    const response = await axios.post(
      `/options/${optionCode}`,
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Опция обновлена",
        type: "success"
      })
    );
    return response.data as null;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
