import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";

import type { IThunkCustomError } from "../types/error";

export interface IErrorSchema {
  errors: IThunkCustomError[];
}

const initialState: IErrorSchema = {
  errors: []
};

export function isThunkActionError(action: AnyAction): boolean {
  return action.type.endsWith("rejected");
}

export function isThunkActionFullfield(action: AnyAction): boolean {
  return action.type.endsWith("fullfield");
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = [];
    },
    shiftError: (state) => {
      state.errors.shift();
    },
    addSuccessMessage: (state, action: PayloadAction<IThunkCustomError>) => {
      state.errors.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // matchers (common for all slices)
      .addMatcher(
        isThunkActionError,
        (state, action: PayloadAction<IThunkCustomError>) => {
          const err = action.payload;
          err.type = "error";
          state.errors.push(err);
        }
      );
  }
});

export const { actions: errorActions, reducer: errorReducer } = errorSlice;
