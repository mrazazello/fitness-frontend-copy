import { PageHeader } from "antd";
import { useEffect } from "react";

import { useClubsSelectItems } from "@entities/club";
import type { IProductEditValues } from "@entities/products";
import { ProductEditForm, createProduct } from "@entities/products";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { productsRoutesPaths } from "./routesPaths";

const ProductCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(productsRoutesPaths.products.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const { clubsSelectOptions } = useClubsSelectItems();

  const handleProductCreate = (values: IProductEditValues) => {
    void dispatch(createProduct(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  };

  return (
    <>
      <PageHeader
        title={productsRoutesPaths.product_create.title}
        onBack={onBack}
      />
      <ProductEditForm
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleProductCreate}
        onCancel={onBack}
      />
    </>
  );
};

export default ProductCreate;
