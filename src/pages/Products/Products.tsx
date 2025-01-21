import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useClubsSelectItems } from "@entities/club";
import type { IProductListItem } from "@entities/products";
import {
  ProductsList,
  fetchProducts,
  getProductsLoading,
  getProductsPagination,
  productsSelectors,
  sortProduct
} from "@entities/products";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { productsRoutesPaths } from "./routesPaths";

const Products = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const loading = useAppSelector(getProductsLoading);
  const pagination = useAppSelector(getProductsPagination);
  const products = addReactKeyByProperty<IProductListItem>(
    useAppSelector(productsSelectors.selectAll),
    "code"
  );
  const { clubsFilterOptions } = useClubsSelectItems();

  const getProducts = () => {
    void dispatch(errorActions.resetErrors());
    void dispatch(
      fetchProducts({
        page: Number(searchParams.get("page")) || 1,
        clubCodes: searchParams.getAll("clubs")
      })
    );
  };

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  const onSort = (code: string, direction: "up" | "down") => {
    void dispatch(sortProduct({ code, direction })).then(() => getProducts());
  };

  return (
    <>
      <PageHeader
        title={productsRoutesPaths.products.title}
        extra={
          <Link to={productsRoutesPaths.product_create.URL()}>
            <Button type="primary">
              {productsRoutesPaths.product_create.title}
            </Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <ProductsList
          products={products}
          clubsFilterOptions={clubsFilterOptions}
          loading={loading === "loading"}
          pagination={pagination}
          onSort={onSort}
          onEdit={(code: string) =>
            navigateSave(productsRoutesPaths.product_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Products;
