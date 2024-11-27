import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

export const deleteEvent = createAsyncThunk<null, string, IThunkConfig>(
  "schedule/deleteEvent",
  async (eventCode: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.delete(`/schedule/${eventCode}`);
      dispatch(
        errorActions.addSuccessMessage({
          message: "Событие удалено",
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
