import {
  IProductListItem,
  IProductDetail,
  fetchProductsParams,
  IProductEditValues,
  IProductEditRequestArgs
} from "./model/types/products";
import {
  productReducer,
  productActions,
  IProductsSchema
} from "./model/slice/productsSlice";
import {
  productsSelectors,
  getProductsLoading,
  getProductDetail,
  getProductsPagination,
  getProductsFilters,
  getProductsSelect
} from "./model/selectors/productsSelectors";
import { createProduct } from "./model/service/createProduct";
import { deleteProduct } from "./model/service/deleteProduct";
import { editProduct } from "./model/service/editProduct";
import { fetchAllProducts } from "./model/service/fetchAllProducts";
import { fetchProduct } from "./model/service/fetchProduct";
import { fetchProducts } from "./model/service/fetchProducts";
import { sortProduct } from "./model/service/sortProduct";
import { useProductsAllSelectItems } from "./hooks/useProductsSelectItems";
import { ProductsList } from "./ui/ProductsList";
import { ProductEditForm } from "./ui/ProductEditForm";

export type {
  IProductListItem,
  IProductDetail,
  fetchProductsParams,
  IProductEditValues,
  IProductEditRequestArgs,
  IProductsSchema
};
export { productReducer, productActions };
export {
  productsSelectors,
  getProductsLoading,
  getProductDetail,
  getProductsPagination,
  getProductsFilters,
  getProductsSelect
};
export { useProductsAllSelectItems };
export {
  createProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  fetchProduct,
  fetchProducts,
  sortProduct
};
export { ProductsList, ProductEditForm };
