import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/index";

import { getProductsSelect } from "../model/selectors/productsSelectors";
import { fetchAllProducts } from "../model/service/fetchAllProducts";

export const useProductsAllSelectItems = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchAllProducts());
  }, []);

  const allProductsOptions = useAppSelector(getProductsSelect).map((item) => ({
    value: item.code,
    label: item.title
  }));

  return allProductsOptions;
};
