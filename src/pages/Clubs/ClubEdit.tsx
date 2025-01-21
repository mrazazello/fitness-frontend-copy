import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  ClubEditForm,
  editClub,
  fetchClub,
  getClubDetail,
  getClubLoading
} from "@entities/club";
import type { IClubEditValues } from "@entities/club/model/types/clubs";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { clubRoutesPaths } from "./routesPaths";

const ClubEditPage = () => {
  const { id } = useParams();
  const { navigateBack } = useNavigateBack();
  const dispatch = useAppDispatch();

  const onBack = () => navigateBack(clubRoutesPaths.club.URL(id));

  useEffect(() => {
    dispatch(errorActions.resetErrors());
    if (id) dispatch(fetchClub(id));
  }, [id]);

  const clubDetail = useAppSelector(getClubDetail);
  const loading = useAppSelector(getClubLoading);

  const handleUpdateClub = useCallback(
    (values: IClubEditValues) => {
      if (id) dispatch(editClub({ code: id, ...values }));
    },
    [id]
  );

  if (!id) return <PageNotFound />;

  return (
    <>
      <PageHeader title={clubRoutesPaths.club_edit.title} onBack={onBack} />
      <ClubEditForm
        clubDetail={clubDetail}
        loading={loading === "loading"}
        onSave={handleUpdateClub}
        onCancel={onBack}
      />
    </>
  );
};

export default ClubEditPage;
