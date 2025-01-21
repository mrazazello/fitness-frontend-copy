import type { RootState } from "@app/index";

import { newsAdapter } from "../slice/newsSlice";

export const newsSelectors = newsAdapter.getSelectors<RootState>(
  (state: RootState) => state.news
);

export const getNewsLoading = (state: RootState) => state.news.loading;

export const getNewsPagination = (state: RootState) => state.news.pagination;

export const getNewsDetail = (state: RootState) => state.news.newsDetail;
