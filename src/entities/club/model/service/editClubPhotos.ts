import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import { convertPhotoListItemoPhotoCodes } from "@shared/models/files";

import type {
  IClubsEditPhotosArgs,
  IClubsEditPhotosRequest
} from "../types/clubs";

export const editClubPhotos = createAsyncThunk<
  null,
  IClubsEditPhotosArgs,
  IThunkConfig
>("clubs/editClubPhotos", async (club, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const clubCode = club.code;
    const request: IClubsEditPhotosRequest = {
      items: convertPhotoListItemoPhotoCodes(club.photos)
    };
    const response = await axios.post(
      `/clubs/${clubCode}/photos`,
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Фотографии обновлены",
        type: "success"
      })
    );
    return response.data as null;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
