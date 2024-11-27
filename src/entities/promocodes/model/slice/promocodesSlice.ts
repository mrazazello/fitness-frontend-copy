import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { IPromocodeDetail, IPromocodeListItem } from "../types/promocodes";
import { fetchPromocodes } from "../service/fetchPromocodes";
import { fetchPromocode } from "../service/fetchPromocode";
import { createPromocode } from "../service/createPromocode";
import { editPromocode } from "../service/editPromocode";
import { deletePromocode } from "../service/deletePromocode";

export interface IPromocodesSchema extends IEntitiesState {
  entities?: IPromocodeListItem[];
  promocodeDetail: IPromocodeDetail | null;
}

const initialState: IPromocodesSchema = {
  loading: "idle",
  promocodeDetail: null
};

export const promocodesAdapter = createEntityAdapter({
  selectId: (item: IPromocodeListItem) => item.code
});

const promocodesSlice = createSlice({
  name: "promocodes",
  initialState: promocodesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch promocodes
      .addCase(fetchPromocodes.fulfilled, (state, action) => {
        promocodesAdapter.removeAll(state);
        promocodesAdapter.addMany(state, action.payload.promocodes.items);
        state.loading = "idle";
      })
      .addCase(fetchPromocodes.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchPromocodes.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one promocode
      .addCase(fetchPromocode.fulfilled, (state, action) => {
        state.promocodeDetail = action.payload.promocode;
        state.loading = "idle";
      })
      .addCase(fetchPromocode.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchPromocode.pending, (state) => {
        state.loading = "loading";
      })
      // create promocode
      .addCase(createPromocode.fulfilled, (state) => {
        // const newProgramm: IProductListItem = {
        //   code: action.payload.code,
        //   title: action.meta.arg.title,
        //   price: action.meta.arg.price,
        //   active: action.meta.arg.active,
        //   club: action.meta.arg.clubCode, // загрузить клуб!
        // };
        // productsAdapter.addOne(state, newProgramm);
        state.loading = "idle";
      })
      .addCase(createPromocode.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createPromocode.pending, (state) => {
        state.loading = "loading";
      })
      // edit promocode
      .addCase(editPromocode.fulfilled, (state, action) => {
        state.promocodeDetail = action.meta.arg;
        state.loading = "idle";
      })
      .addCase(editPromocode.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editPromocode.pending, (state) => {
        state.loading = "loading";
      })
      // delete promocode
      .addCase(deletePromocode.fulfilled, (state, action) => {
        promocodesAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deletePromocode.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deletePromocode.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: promocodesActions, reducer: promocodesReducer } =
  promocodesSlice;