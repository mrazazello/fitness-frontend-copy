import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { ISliderCreateRequest, ISliderCreateResponse } from "../types/sliders";

import { fetchSliders } from "./fetchSliders";

export const createSlider = createAsyncThunk<
  ISliderCreateResponse,
  ISliderCreateRequest,
  IThunkConfig
>("sliders/createSlider", async (request: ISliderCreateRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const response = await axios.post("/sliders", JSON.stringify(request));
    dispatch(
      errorActions.addSuccessMessage({
        message: "Слайдер добавлен",
        type: "success"
      })
    );
    void dispatch(fetchSliders(1));
    return response.data as ISliderCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
