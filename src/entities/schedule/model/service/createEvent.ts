import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
  IScheduleCreateArgs,
  IScheduleCreateRequest,
  IScheduleCreateResponse
} from "../types/schedule";

export const createEvent = createAsyncThunk<
  IScheduleCreateResponse,
  IScheduleCreateArgs,
  IThunkConfig
>("schedule/createEvent", async (args: IScheduleCreateArgs, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const request: IScheduleCreateRequest = {
    startedAt: args.startedAt,
    programCode: args.program.code,
    teacherCode: args.teacher.code,
    areaCode: args.area.code,
    paid: args.paid,
    comment: args.comment
  };
  try {
    const response = await axios.post("/schedule", JSON.stringify(request));
    dispatch(
      errorActions.addSuccessMessage({
        message: "Событие добавлено",
        type: "success"
      })
    );
    return response.data as IScheduleCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
