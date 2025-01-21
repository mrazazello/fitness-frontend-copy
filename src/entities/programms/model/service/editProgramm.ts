import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { errorActions } from "@shared/api/error";
import type { IThunkConfig } from "@shared/api/error/model/types/error";
import type { PartialBy } from "@shared/models/slice";

import type { IProgrammEditRequest } from "../types/programms";

export const editProgramm = createAsyncThunk<
  null,
  IProgrammEditRequest,
  IThunkConfig
>(
  "programms/editProgramm",
  async (programm: IProgrammEditRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const coachCode = programm.code;
      const request: PartialBy<IProgrammEditRequest, "code"> = {
        ...programm
      };
      delete request.code;
      const response = await axios.post(
        `/programs/${coachCode}`,
        JSON.stringify(request)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Программа обновлена",
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
