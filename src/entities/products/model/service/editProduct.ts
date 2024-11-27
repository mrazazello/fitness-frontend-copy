import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PartialBy } from "@shared/models/slice";
import { IThunkConfig } from "@app/index";
import { errorActions } from "@shared/api/error";

import {
  IProductEditRequest,
  IProductEditRequestArgs
} from "../types/products";

export const editProduct = createAsyncThunk<
  null,
  IProductEditRequestArgs,
  IThunkConfig
>(
  "products/editProduct",
  async (product: IProductEditRequestArgs, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const productCode = product.code;
      const request: PartialBy<IProductEditRequestArgs, "code"> = {
        ...product
      };
      delete request.code;
      const backendRequest: IProductEditRequest = {
        title: product.title,
        oldPrice: product.oldPrice,
        price: product.price,
        description: product.description,
        clubCodes: product.clubs.map((el) => el.code),
        active: product.active,
        promocode: product.promocode
      };
      const response = await axios.post(
        `/products/${productCode}`,
        JSON.stringify(backendRequest)
      );
      dispatch(
        errorActions.addSuccessMessage({
          message: "Акция обновлена",
          type: "success"
        })
      );
      return response.data as null;
    } catch (err) {
      if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
      throw err;
    }
  }
);
