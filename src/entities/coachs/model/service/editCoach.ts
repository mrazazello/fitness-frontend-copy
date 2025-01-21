import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { ICoachEditArgs, ICoachEditRequest } from "../types/coachs";

export const editCoach = createAsyncThunk<null, ICoachEditArgs, IThunkConfig>(
  "coachs/editCoach",
  async (coach: ICoachEditArgs, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const coachCode = coach.code;
      const request: PartialBy<ICoachEditArgs, "code"> = {
        ...coach
      };
      delete request.code;
      const clubs = request.clubs.map((item) => item.code);
      const backendRequest: ICoachEditRequest = {
        ...request,
        photoCode: request.photo.code,
        clubCodes: clubs
      };
      const response = await axios.post(
        `/teachers/${coachCode}`,
        JSON.stringify(backendRequest)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Тренер обновлен",
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
