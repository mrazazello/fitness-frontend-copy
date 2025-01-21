import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

import type { ISliderDetailResponse, ISliderListItem } from "../types/sliders";

import { fetchSliders } from "./fetchSliders";

export const toggleSlider = createAsyncThunk<
  ISliderDetailResponse,
  ISliderListItem,
  IThunkConfig
>("sliders/toggleSlider", async (slider, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const response = await axios.post(`/sliders/${slider.code}/active`);
    dispatch(
      errorActions.addSuccessMessage({
        message: "Статус слайдера изменен",
        type: "success"
      })
    );
    await dispatch(fetchSliders(1));
    return response.data as ISliderDetailResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
