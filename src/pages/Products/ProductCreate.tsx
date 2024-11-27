import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import { useClubsSelectItems } from "@entities/club";
import {
  IProductEditValues,
  ProductEditForm,
  createProduct
} from "@entities/products";

import { productsRoutes } from "./Routes";

const ProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const { clubsSelectOptions } = useClubsSelectItems();

  const handleProductCreate = (values: IProductEditValues) => {
    void dispatch(createProduct(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        navigate(productsRoutes.products.URL());
    });
  };

  return (
    <>
      <PageHeader
        title={productsRoutes.product_create.title}
        onBack={() => navigate(productsRoutes.products.URL())}
      />
      <ProductEditForm
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleProductCreate}
        onCancel={() => navigate(productsRoutes.products.URL())}
      />
    </>
  );
};

export default ProductCreate;
