import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { IEntitiesState } from "@shared/models/slice";

import { createNews } from "../service/createNews";
import { deleteNews } from "../service/deleteNews";
import { editNews } from "../service/editNews";
import { fetchNews } from "../service/fetchNews";
import { fetchNewsDetail } from "../service/fetchNewsDetail";
import type { INewsDetail, INewsListItem } from "../types/news";

export interface INewsSchema extends IEntitiesState {
  entities?: INewsListItem[];
  newsDetail?: INewsDetail;
}

const initialState: INewsSchema = {
  loading: "idle"
};

export const newsAdapter = createEntityAdapter({
  selectId: (item: INewsListItem) => item.code
});

const newsSlice = createSlice({
  name: "news",
  initialState: newsAdapter.getInitialState(initialState),
  reducers: {
    resetDetail: (state) => {
      state.newsDetail = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch news
      .addCase(fetchNews.fulfilled, (state, action) => {
        newsAdapter.removeAll(state);
        newsAdapter.addMany(state, action.payload.news.items);
        state.pagination = action.payload.news.pagination;
        state.loading = "idle";
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchNews.pending, (state) => {
        state.loading = "loading";
      })
      // delete news
      .addCase(deleteNews.fulfilled, (state, action) => {
        newsAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteNews.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = "loading";
      })
      // create news
      .addCase(createNews.fulfilled, (state, action) => {
        const newNews: INewsDetail = {
          code: action.payload.code,
          ...action.meta.arg
        };
        state.newsDetail = newNews;
        state.loading = "idle";
      })
      .addCase(createNews.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createNews.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one news
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.newsDetail = action.payload.news;
        state.loading = "idle";
      })
      .addCase(fetchNewsDetail.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchNewsDetail.pending, (state) => {
        state.loading = "loading";
      })
      // edit news
      .addCase(editNews.fulfilled, (state, action) => {
        state.newsDetail = action.meta.arg;
        state.loading = "idle";
      })
      .addCase(editNews.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editNews.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: newsActions, reducer: newsReducer } = newsSlice;
