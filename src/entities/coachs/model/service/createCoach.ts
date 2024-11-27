import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
  ICoachCreateArgs,
  ICoachCreateRequest,
  ICoachCreateResponse
} from "../types/coachs";

export const createCoach = createAsyncThunk<
  ICoachCreateResponse,
  ICoachCreateArgs,
  IThunkConfig
>("coachs/createCoach", async (request: ICoachCreateArgs, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const clubs = request.clubs.map((item) => item.code);
  const backendRequest: ICoachCreateRequest = {
    ...request, // лучше так не делать - нужно преобразование полное
    photoCode: request.photo.code,
    clubCodes: clubs
  };
  try {
    const response = await axios.post(
      "/teachers",
      JSON.stringify(backendRequest)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Тренер добавлен",
        type: "success"
      })
    );
    return response.data as ICoachCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
