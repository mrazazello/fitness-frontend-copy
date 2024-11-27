import { PageHeader } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

import {
  ClubEditForm,
  editClub,
  fetchClub,
  getClubDetail,
  getClubLoading
} from "@entities/club";
import { useAppDispatch, useAppSelector } from "@app/index";
import { errorActions } from "@shared/api/error";
import { IClubEditValues } from "@entities/club/model/types/clubs";

import PageNotFound from "../404/PageNotFound";

import { clubRoutes } from "./Routes";

const ClubEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    id && void dispatch(fetchClub(id));
  }, [id]);

  const clubDetail = useAppSelector(getClubDetail);
  const loading = useAppSelector(getClubLoading);

  const handleUpdateClub = useCallback(
    (values: IClubEditValues) => {
      id && void dispatch(editClub({ code: id, ...values }));
    },
    [id]
  );

  if (!id) return <PageNotFound />;

  return (
    <>
      <PageHeader
        title={clubRoutes.club_edit.title}
        onBack={() => navigate(clubRoutes.club.URL(id))}
      />
      <ClubEditForm
        clubDetail={clubDetail}
        loading={loading === "loading"}
        onSave={handleUpdateClub}
        onCancel={() => navigate(clubRoutes.club.URL(id))}
      />
    </>
  );
};

export default ClubEditPage;
