import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { ISliderFormDetail, ISliderListItem } from "../types/sliders";
import { fetchSliders } from "../service/fetchSliders";
import { fetchSlider } from "../service/fetchSlider";
import { createSlider } from "../service/createSlider";
import { editSlider } from "../service/editSlider";
import { deleteSlider } from "../service/deleteSlider";
import { toggleSlider } from "../service/toggleSlider";

export interface ISlidersSchema extends IEntitiesState {
  entities?: ISliderListItem[];
  sliderDetail?: ISliderFormDetail;
}

const initialState: ISlidersSchema = {
  loading: "idle"
};

export const slidersAdapter = createEntityAdapter({
  selectId: (item: ISliderListItem) => item.code
});

const slidersSlice = createSlice({
  name: "sliders",
  initialState: slidersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch sliders
      .addCase(fetchSliders.fulfilled, (state, action) => {
        slidersAdapter.removeAll(state);
        slidersAdapter.addMany(state, action.payload.sliders.items);
        state.pagination = action.payload.sliders.pagination;
        state.loading = "idle";
      })
      .addCase(fetchSliders.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchSliders.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one slider
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.sliderDetail = action.payload.slider;
        state.loading = "idle";
      })
      .addCase(fetchSlider.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchSlider.pending, (state) => {
        state.loading = "loading";
      })
      // create slider
      .addCase(createSlider.fulfilled, (state) => {
        state.loading = "idle";
      })
      .addCase(createSlider.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createSlider.pending, (state) => {
        state.loading = "loading";
      })
      // edit slider
      .addCase(editSlider.fulfilled, (state, action) => {
        state.sliderDetail = action.meta.arg;
        const update = {
          id: action.meta.arg.code,
          changes: {
            title: action.meta.arg.title,
            subTitle: action.meta.arg.subTitle,
            buttonTitle: action.meta.arg.buttonTitle,
            buttonLink: action.meta.arg.buttonLink
          }
        };
        slidersAdapter.updateOne(state, update);
        state.loading = "idle";
      })
      .addCase(editSlider.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editSlider.pending, (state) => {
        state.loading = "loading";
      })
      // delete slider
      .addCase(deleteSlider.fulfilled, (state, action) => {
        slidersAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteSlider.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteSlider.pending, (state) => {
        state.loading = "loading";
      })
      // toggle one slider
      .addCase(toggleSlider.fulfilled, (state) => {
        state.loading = "idle";
      })
      .addCase(toggleSlider.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(toggleSlider.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: sliderActions, reducer: sliderReducer } = slidersSlice;
