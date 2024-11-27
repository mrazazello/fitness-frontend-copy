import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import { IOfferEditValues, OfferEditForm, createOffer } from "@entities/offers";

import { offersRoutes } from "./Routes";

const OfferCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleOfferCreate = (values: IOfferEditValues) => {
    if (!values.photo || !values.photo[0]?.response?.code) return;

    void dispatch(
      createOffer({
        name: values.name,
        title: values.title,
        endAt: dayjs(values.endAt).format("YYYY-MM-DD hh:mm:ss"),
        photo: convertIFileResponseToPhotoListItem(values.photo[0].response)
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        navigate(offersRoutes.offers.URL());
    });
  };

  return (
    <>
      <PageHeader
        title={offersRoutes.offer_create.title}
        onBack={() => navigate(offersRoutes.offers.URL())}
      />
      <OfferEditForm
        onSave={handleOfferCreate}
        onCancel={() => navigate(offersRoutes.offers.URL())}
      />
    </>
  );
};

export default OfferCreate;
