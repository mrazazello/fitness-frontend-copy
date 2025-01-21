import { createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { logOut } from "../service/logOut";
import { login } from "../service/login";
import { refreshToken } from "../service/refreshToken";

export interface IAuthSchema extends IEntitiesState {
  accessToken: string | null;
}

const initialState: IAuthSchema = {
  accessToken: null,
  loading: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        state.loading = "idle";
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.loading = "failed";
      })
      // login user
      .addCase(login.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        state.loading = "idle";
      })
      .addCase(login.rejected, (state) => {
        state.accessToken = null;
        state.loading = "failed";
      })
      // logout
      .addCase(logOut.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.accessToken = null;
        state.loading = "idle";
      })
      .addCase(logOut.rejected, (state) => {
        state.accessToken = null;
        state.loading = "failed";
      });
  }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
