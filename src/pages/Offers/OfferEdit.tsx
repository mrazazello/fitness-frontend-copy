import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import {
  IOfferEditValues,
  OfferEditForm,
  editOffer,
  fetchOffer,
  getOfferDetail,
  getOffersLoading
} from "@entities/offers";

import PageNotFound from "../404/PageNotFound";

import { offersRoutes } from "./Routes";

const OfferEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        code: offerDetail.code,
        name: values.name,
        title: values.title,
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
        title={`${offersRoutes.offer_edit.title}: ${offerDetail?.name}`}
        onBack={() => navigate(offersRoutes.offers.URL())}
      />
      <OfferEditForm
        offerDetail={offerDetail}
        loading={loading === "loading"}
        onSave={handleOfferEdit}
        onCancel={() => navigate(offersRoutes.offers.URL())}
      />
    </>
  );
};

export default OfferEdit;
