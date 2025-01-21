import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IClubDetail, IClubEditRequest } from "../types/clubs";

export const editClub = createAsyncThunk<
  IClubDetail,
  IClubEditRequest,
  IThunkConfig
>("clubs/editClub", async (club: IClubEditRequest, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const clubCode = club.code;
    const request: PartialBy<IClubEditRequest, "code"> = {
      ...club
    };
    delete request.code;
    const response = await axios.post(
      `/clubs/${clubCode}/detail`,
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Информация о клубе обновлена",
        type: "success"
      })
    );
    return response.data as IClubDetail;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
