import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";

export const deleteProgramm = createAsyncThunk<null, string, IThunkConfig>(
  "programms/deleteProgramm",
  async (coachCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/programs/${coachCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Программа удалена",
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
