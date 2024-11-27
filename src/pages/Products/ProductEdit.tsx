import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { clubsSelectors, useClubsSelectItems } from "@entities/club";
import {
  IProductEditValues,
  ProductEditForm,
  editProduct,
  fetchProduct,
  getProductDetail,
  getProductsLoading
} from "@entities/products";

import PageNotFound from "../404/PageNotFound";

import { productsRoutes } from "./Routes";

const PromocodeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        onBack={() => navigate(productsRoutes.products.URL())}
      />
      <ProductEditForm
        productDetail={productDetail}
        loading={loading === "loading"}
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleProductEdit}
        onCancel={() => navigate(productsRoutes.products.URL())}
      />
    </>
  );
};

export default PromocodeEdit;
