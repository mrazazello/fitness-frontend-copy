import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { createOffer } from "../service/createOffer";
import { deleteOffer } from "../service/deleteOffer";
import { editOffer } from "../service/editOffer";
import { fetchOffer } from "../service/fetchOffer";
import { fetchOffers } from "../service/fetchOffers";
import type { IOfferDetail, IOfferListItem } from "../types/offers";

export interface IOffersSchema extends IEntitiesState {
  entities?: IOfferListItem[];
  offerDetail?: IOfferDetail;
}

const initialState: IOffersSchema = {
  loading: "idle"
};

export const offersAdapter = createEntityAdapter({
  selectId: (item: IOfferListItem) => item.code
});

const offersSlice = createSlice({
  name: "offers",
  initialState: offersAdapter.getInitialState(initialState),
  reducers: {
    resetDetail: (state) => {
      state.offerDetail = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch offers
      .addCase(fetchOffers.fulfilled, (state, action) => {
        offersAdapter.removeAll(state);
        offersAdapter.addMany(state, action.payload.specialOffer.items);
        state.pagination = action.payload.specialOffer.pagination;
        state.loading = "idle";
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchOffers.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one offer
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerDetail = action.payload.specialOffer;
        state.loading = "idle";
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchOffer.pending, (state) => {
        state.loading = "loading";
      })
      // create offer
      .addCase(createOffer.fulfilled, (state, action) => {
        const newOffer: IOfferListItem = {
          code: action.payload.code,
          name: action.meta.arg.name,
          title: action.meta.arg.title,
          endAt: action.meta.arg.endAt,
          photo: action.meta.arg.photo
        };
        offersAdapter.addOne(state, newOffer);
        state.loading = "idle";
      })
      .addCase(createOffer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createOffer.pending, (state) => {
        state.loading = "loading";
      })
      // edit offer
      .addCase(editOffer.fulfilled, (state, action) => {
        state.offerDetail = action.meta.arg;
        state.loading = "idle";
      })
      .addCase(editOffer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editOffer.pending, (state) => {
        state.loading = "loading";
      })
      // delete offer
      .addCase(deleteOffer.fulfilled, (state, action) => {
        offersAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteOffer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteOffer.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: offerActions, reducer: offerReducer } = offersSlice;
