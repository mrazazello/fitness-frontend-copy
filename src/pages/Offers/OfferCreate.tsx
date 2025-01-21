import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import type { IOfferEditValues } from "@entities/offers";
import { OfferEditForm, createOffer } from "@entities/offers";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import { offersRoutesPaths } from "./routesPaths";

const OfferCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(offersRoutesPaths.offers.URL());

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
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  };

  return (
    <>
      <PageHeader
        title={offersRoutesPaths.offer_create.title}
        onBack={onBack}
      />
      <OfferEditForm onSave={handleOfferCreate} onCancel={onBack} />
    </>
  );
};

export default OfferCreate;
