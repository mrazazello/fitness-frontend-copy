import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { clubsSelectors, useClubsSelectItems } from "@entities/club";
import type { IProductEditValues } from "@entities/products";
import {
  ProductEditForm,
  editProduct,
  fetchProduct,
  getProductDetail,
  getProductsLoading,
  productActions
} from "@entities/products";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { productsRoutesPaths } from "./routesPaths";

const PromocodeEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(productActions.resetDetail());
    navigateBack(productsRoutesPaths.products.URL());
  }, []);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchProduct(id));
  }, [id]);

  const productDetail = useAppSelector(getProductDetail);
  const loading = useAppSelector(getProductsLoading);
  const clubs = useAppSelector(clubsSelectors.selectAll);

  const { clubsSelectOptions } = useClubsSelectItems();

  const handleProductEdit = useCallback(
    (values: IProductEditValues) => {
      const filteredClub = clubs.filter((item) =>
        values.clubCodes.includes(item.code)
      );
      console.log("values: ", values);
      if (productDetail && filteredClub) {
        void dispatch(
          editProduct({
            ...values,
            code: productDetail.code,
            clubs: filteredClub
          })
        );
      }
    },
    [productDetail, clubs]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!productDetail) return null;

  return (
    <>
      <PageHeader
        title={`Редактирование акции: ${productDetail.title}`}
        onBack={onBack}
      />
      <ProductEditForm
        productDetail={productDetail}
        loading={loading === "loading"}
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleProductEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default PromocodeEdit;
