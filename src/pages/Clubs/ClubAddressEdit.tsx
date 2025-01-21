import { PageHeader } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { clubRoutesPaths } from "./routesPaths";

const ClubAddressEdit = () => {
  const { id } = useParams();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(clubRoutesPaths.club.URL(id));
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
        title={`${clubRoutesPaths.club_address_edit.title}: ${clubAddress.street}`}
        onBack={onBack}
      />
      <ClubAddressEditForm
        clubAddress={clubAddress}
        loading={loading === "loading"}
        clubId={id}
        streetTypes={streetTypes}
        onCancel={onBack}
      />
    </>
  );
};

export default ClubAddressEdit;
