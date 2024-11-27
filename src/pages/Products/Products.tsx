import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useClubsSelectItems } from "@entities/club";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  fetchProducts,
  getProductsLoading,
  getProductsPagination,
  IProductListItem,
  ProductsList,
  productsSelectors,
  sortProduct
} from "@entities/products";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { productsRoutes } from "./Routes";

const Products = () => {
  const navigate = useNavigate();
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
        title={productsRoutes.products.title}
        extra={
          <Link to={productsRoutes.product_create.URL()}>
            <Button type="primary">
              {productsRoutes.product_create.title}
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
            navigate(productsRoutes.product_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Products;
