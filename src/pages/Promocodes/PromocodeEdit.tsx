import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProductsAllSelectItems } from "@entities/products";
import type { IPromocodeEditValues } from "@entities/promocodes";
import {
  PromocodeEditForm,
  editPromocode,
  fetchPromocode,
  getPromocodesDetail,
  getPromocodesLoading,
  promocodesActions
} from "@entities/promocodes";
import { errorActions } from "@shared/api/error";
import { defaultBackendDateFormat } from "@shared/constants/params";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";
import { promocodesRoutesPaths } from "./routesPaths";

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(promocodesActions.resetDetail());
    navigateBack(promocodesRoutesPaths.promocodes.URL());
  }, []);

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
        title={`${promocodesRoutesPaths.promocode_edit.title}: ${promocodeDetail.secret}`}
        onBack={onBack}
      />
      <PromocodeEditForm
        promocodeDetail={promocodeDetail}
        loading={loading === "loading"}
        allProductsOptions={allProductsOptions}
        onSave={handleProductEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default ProductEdit;
