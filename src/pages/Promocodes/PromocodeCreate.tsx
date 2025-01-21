import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";

import {
  fetchAllProducts,
  useProductsAllSelectItems
} from "@entities/products";
import { PromocodeEditForm, createPromocode } from "@entities/promocodes";
import type { IPromocodeCreateValues } from "@entities/promocodes/model/types/promocodes";
import { errorActions } from "@shared/api/error";
import { defaultBackendDateFormat } from "@shared/constants/params";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import { promocodesRoutesPaths } from "./routesPaths";

const PromocodeCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(promocodesRoutesPaths.promocodes.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchAllProducts());
  }, []);

  const allProductsOptions = useProductsAllSelectItems();

  const handleProgrammCreate = useCallback((values: IPromocodeCreateValues) => {
    void dispatch(
      createPromocode({
        ...values,
        startAt: dayjs(values.startAt).format(defaultBackendDateFormat),
        endAt: dayjs(values.endAt).format(defaultBackendDateFormat),
        productCodes: values.productCodes
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  }, []);

  return (
    <>
      <PageHeader
        title={promocodesRoutesPaths.promocode_create.title}
        onBack={onBack}
      />
      <PromocodeEditForm
        allProductsOptions={allProductsOptions}
        onSave={handleProgrammCreate}
        onCancel={onBack}
      />
    </>
  );
};

export default PromocodeCreate;
