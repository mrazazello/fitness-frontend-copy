import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { ISliderEditRequest } from "../types/sliders";

export const editSlider = createAsyncThunk<
  null,
  ISliderEditRequest,
  IThunkConfig
>("sliders/editSlider", async (doc: ISliderEditRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const docCode = doc.code;
    const request: PartialBy<ISliderEditRequest, "code"> = {
      ...doc
    };
    delete request.code;
    const response = await axios.post(
      `/sliders/${docCode}`,
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Слайдер обновлен",
        type: "success"
      })
    );
    return response.data as null;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
