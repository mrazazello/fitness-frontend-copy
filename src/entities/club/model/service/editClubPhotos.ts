import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { convertPhotoListItemoPhotoCodes } from "@shared/models/files";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { IClubsEditPhotosArgs, IClubsEditPhotosRequest } from "../types/clubs";

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
