import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import {
  fetchAllProducts,
  useProductsAllSelectItems
} from "@entities/products";
import { IPromocodeCreateValues } from "@entities/promocodes/model/types/promocodes";
import { PromocodeEditForm, createPromocode } from "@entities/promocodes";
import { defaultBackendDateFormat } from "@shared/constants/params";

import { promocodesRoutes } from "./Routes";

const PromocodeCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      if (res.meta.requestStatus === "fulfilled")
        navigate(promocodesRoutes.promocodes.URL());
    });
  }, []);

  return (
    <>
      <PageHeader
        title={promocodesRoutes.promocode_create.title}
        onBack={() => navigate(-1)}
      />
      <PromocodeEditForm
        allProductsOptions={allProductsOptions}
        onSave={handleProgrammCreate}
        onCancel={() => navigate(promocodesRoutes.promocodes.URL())}
      />
    </>
  );
};

export default PromocodeCreate;
