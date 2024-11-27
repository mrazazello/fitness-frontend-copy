import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { IScheduleEditArgs, IScheduleEditRequest } from "../types/schedule";

export const editEvent = createAsyncThunk<
  null,
  IScheduleEditArgs,
  IThunkConfig
>("schedule/editEvent", async (args: IScheduleEditArgs, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const eventCode = args.code;
    const request: IScheduleEditRequest = {
      startedAt: args.startedAt,
      programCode: args.program.code,
      teacherCode: args.teacher.code,
      areaCode: args.area.code,
      paid: args.paid,
      comment: args.comment
    };
    const response = await axios.post(
      `/schedule/${eventCode}`,
      JSON.stringify(request)
    );
    dispatch(
      errorActions.addSuccessMessage({
        message: "Событие обновлено",
        type: "success"
      })
    );
    return response.data as null;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
