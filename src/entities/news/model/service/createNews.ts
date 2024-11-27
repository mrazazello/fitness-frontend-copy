import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
  INewsCreateArgs,
  INewsCreateRequest,
  INewsCreateResponse
} from "../types/news";

export const createNews = createAsyncThunk<
  INewsCreateResponse,
  INewsCreateArgs,
  IThunkConfig
>("news/createNews", async (args: INewsCreateArgs, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const request: INewsCreateRequest = {
      title: args.title,
      date: args.date,
      content: args.content,
      photoCode: args.photo.code
    };
    const response = await axios.post("/news", JSON.stringify(request));
    dispatch(
      errorActions.addSuccessMessage({
        message: "Новость добавлена",
        type: "success"
      })
    );
    return response.data as INewsCreateResponse;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    throw err;
  }
});
