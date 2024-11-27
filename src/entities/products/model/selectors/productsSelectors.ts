import { RootState } from "@app/index";

import { productsAdapter } from "../slice/productsSlice";

export const productsSelectors = productsAdapter.getSelectors<RootState>(
  (state: RootState) => state.products
);

export const getProductsLoading = (state: RootState) => state.products.loading;

export const getProductDetail = (state: RootState) =>
  state.products.productDetail;

export const getProductsPagination = (state: RootState) =>
  state.products.pagination;

export const getProductsFilters = (state: RootState) => state.products.filters;

export const getProductsSelect = (state: RootState) =>
  state.products.allProducts ?? [];
