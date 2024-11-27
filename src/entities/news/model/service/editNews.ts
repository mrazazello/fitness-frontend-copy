import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PartialBy } from "@shared/models/slice";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import { INewsEditArgs, INewsEditRequest } from "../types/news";

export const editNews = createAsyncThunk<null, INewsEditArgs, IThunkConfig>(
  "news/editNews",
  async (args: INewsEditArgs, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { code } = args;
      const request: PartialBy<INewsEditArgs, "code"> = {
        ...args
      };
      delete request.code;
      const backendRequest: INewsEditRequest = {
        title: args.title,
        date: args.date,
        content: args.content,
        photoCode: args.photo.code
      };
      const response = await axios.post(
        `/news/${code}`,
        JSON.stringify(backendRequest)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Новость обновлена",
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
