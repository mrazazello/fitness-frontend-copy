import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { defaultBackendDateFormat } from "@shared/constants/params";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  IPromocodeEditValues,
  PromocodeEditForm,
  editPromocode,
  fetchPromocode,
  getPromocodesDetail,
  getPromocodesLoading
} from "@entities/promocodes";
import { useProductsAllSelectItems } from "@entities/products";

import PageNotFound from "../404/PageNotFound";

import { promocodesRoutes } from "./Routes";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchPromocode(id));
  }, [id]);

  const promocodeDetail = useAppSelector(getPromocodesDetail);
  const loading = useAppSelector(getPromocodesLoading);
  const allProductsOptions = useProductsAllSelectItems();

  const handleProductEdit = useCallback(
    (values: IPromocodeEditValues) => {
      if (promocodeDetail) {
        void dispatch(
          editPromocode({
            ...values,
            code: promocodeDetail.code,
            startAt: dayjs(values.startAt).format(defaultBackendDateFormat),
            endAt: dayjs(values.endAt).format(defaultBackendDateFormat),
            productCodes: values.productCodes
          })
        );
      }
    },
    [promocodeDetail]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!promocodeDetail) return null;

  return (
    <>
      <PageHeader
        title={`${promocodesRoutes.promocode_edit.title}: ${promocodeDetail.secret}`}
        onBack={() => navigate(promocodesRoutes.promocodes.URL())}
      />
      <PromocodeEditForm
        promocodeDetail={promocodeDetail}
        loading={loading === "loading"}
        allProductsOptions={allProductsOptions}
        onSave={handleProductEdit}
        onCancel={() => navigate(promocodesRoutes.promocodes.URL())}
      />
    </>
  );
};

export default ProductEdit;
