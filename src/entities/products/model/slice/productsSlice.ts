import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { FilterType, IEntitiesState } from "@shared/models/slice";

import {
  IProductDetail,
  IProductListItem,
  IProductSelectItem
} from "../types/products";
import { fetchProducts } from "../service/fetchProducts";
import { fetchProduct } from "../service/fetchProduct";
import { fetchAllProducts } from "../service/fetchAllProducts";
import { createProduct } from "../service/createProduct";
import { editProduct } from "../service/editProduct";
import { deleteProduct } from "../service/deleteProduct";

export interface IProductsSchema extends IEntitiesState {
  entities?: IProductListItem[];
  productDetail: IProductDetail | null;
  allProducts?: IProductSelectItem[];
  filters: FilterType;
}

const initialState: IProductsSchema = {
  loading: "idle",
  productDetail: null,
  filters: {}
};

export const productsAdapter = createEntityAdapter({
  selectId: (item: IProductListItem) => item.code
});

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productsAdapter.removeAll(state);
        productsAdapter.addMany(state, action.payload.products.items);
        state.pagination = action.payload.products.pagination;
        state.loading = "idle";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one product
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product;
        state.loading = "idle";
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = "loading";
      })
      // fetch all products for select
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.products.items;
        state.loading = "idle";
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = "loading";
      })
      // create product
      .addCase(createProduct.fulfilled, (state) => {
        // const newProduct: IProductListItem = {
        //   code: action.payload.code,
        //   title: action.meta.arg.title,
        //   oldPrice: action.meta.arg.oldPrice,
        //   price: action.meta.arg.price,
        //   active: action.meta.arg.active,
        //   promocode: action.meta.arg.promocode,
        //   // clubs: action.meta.arg.clubCodes,
        // };
        // productsAdapter.addOne(state, newProduct);
        state.loading = "idle";
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = "loading";
      })
      // edit product
      .addCase(editProduct.fulfilled, (state, action) => {
        const update = {
          id: action.meta.arg.code,
          changes: {
            title: action.meta.arg.title,
            description: action.meta.arg.description,
            price: action.meta.arg.price,
            active: action.meta.arg.active,
            clubs: action.meta.arg.clubs,
            promocode: action.meta.arg.promocode
          }
        };
        productsAdapter.updateOne(state, update);
        const productDetail: IProductDetail = {
          code: action.meta.arg.code,
          active: action.meta.arg.active,
          title: action.meta.arg.title,
          oldPrice: action.meta.arg.oldPrice,
          price: action.meta.arg.price,
          clubs: action.meta.arg.clubs,
          promocode: action.meta.arg.promocode,
          description: action.meta.arg.description
        };
        state.productDetail = productDetail;
        state.loading = "idle";
      })
      .addCase(editProduct.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = "loading";
      })
      // delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productsAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: productActions, reducer: productReducer } =
  productsSlice;
