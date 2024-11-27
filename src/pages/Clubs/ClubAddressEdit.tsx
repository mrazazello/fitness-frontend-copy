import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ClubAddressEditForm,
  fetchClub,
  fetchClubAddress,
  getClubAddress,
  getClubLoading
} from "@entities/club";
import {
  fetchstreetTypes,
  useStreetTypesSelect
} from "@entities/streetTypesSlice";

import PageNotFound from "../404/PageNotFound";

import { clubRoutes } from "./Routes";

const ClubAddressEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(errorActions.resetErrors());
    if (id) {
      void dispatch(fetchstreetTypes());
      void dispatch(fetchClub(id));
      void dispatch(fetchClubAddress(id));
    }
  }, [id]);

  const loading = useAppSelector(getClubLoading);
  const clubAddress = useAppSelector(getClubAddress);
  const streetTypes = useStreetTypesSelect();

  if (!id) return <PageNotFound />;

  if (!clubAddress) return null;

  return (
    <>
      <PageHeader
        title={`${clubRoutes.club_address_edit.title}: ${clubAddress.street}`}
        onBack={() => navigate(clubRoutes.club.URL(id))}
      />
      <ClubAddressEditForm
        clubAddress={clubAddress}
        loading={loading === "loading"}
        clubId={id}
        streetTypes={streetTypes}
        onCancel={() => navigate(clubRoutes.club.URL(id))}
      />
    </>
  );
};

export default ClubAddressEdit;
