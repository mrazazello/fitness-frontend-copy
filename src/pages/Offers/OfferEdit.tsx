import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { IOfferEditValues } from "@entities/offers";
import {
  OfferEditForm,
  editOffer,
  fetchOffer,
  getOfferDetail,
  getOffersLoading,
  offerActions
} from "@entities/offers";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";

import PageNotFound from "../404/PageNotFound";

import { offersRoutesPaths } from "./routesPaths";

const OfferEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(offerActions.resetDetail());
    navigateBack(offersRoutesPaths.offers.URL());
  }, []);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchOffer(id));
  }, [id]);

  const loading = useAppSelector(getOffersLoading);
  const offerDetail = useAppSelector(getOfferDetail);

  const handleOfferEdit = (values: IOfferEditValues) => {
    if (!offerDetail || !values.photo || !values.photo[0]?.response?.code)
      return;

    void dispatch(
      editOffer({
        ...values,
        code: offerDetail.code,
        endAt: dayjs(values.endAt).format("YYYY-MM-DD hh:mm:ss"),
        photo: convertIFileResponseToPhotoListItem(values.photo[0].response)
      })
    );
  };

  if (!id || loading === "failed") return <PageNotFound />;

  if (!offerDetail) return null;

  return (
    <>
      <PageHeader
        title={`${offersRoutesPaths.offer_edit.title}: ${offerDetail?.name}`}
        onBack={onBack}
      />
      <OfferEditForm
        offerDetail={offerDetail}
        loading={loading === "loading"}
        onSave={handleOfferEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default OfferEdit;
