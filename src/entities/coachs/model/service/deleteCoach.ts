import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

export const deleteCoach = createAsyncThunk<null, string, IThunkConfig>(
  "coachs/deleteCoach",
  async (coachCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/teachers/${coachCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Тренер удален",
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
