import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ClubPhotosEditForm,
  clubActions,
  fetchClub,
  fetchClubPhotos,
  getClubDetail,
  getClubLoading,
  getClubPhotos
} from "@entities/club";

import PageNotFound from "../404/PageNotFound";

import { clubRoutes } from "./Routes";

const ClubPhotoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(clubActions.resetPhotos());

    if (id) {
      void dispatch(fetchClubPhotos(id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          void dispatch(fetchClub(id));
        }
      });
    }
  }, [id]);

  const clubDetail = useAppSelector(getClubDetail);
  const loading = useAppSelector(getClubLoading);
  const clubPhotos = useAppSelector(getClubPhotos);

  if (!id || loading === "failed") return <PageNotFound />;

  if (clubPhotos === undefined) return null;

  if (!clubDetail) return null;

  return (
    <>
      <PageHeader
        title={`${clubRoutes.club_photos_edit.title}: ${clubDetail.clubName}`}
        onBack={() => navigate(clubRoutes.club.URL(id))}
      />
      <ClubPhotosEditForm
        clubId={id}
        clubPhotos={clubPhotos}
        loading={loading === "loading"}
        onCancel={() => navigate(clubRoutes.club.URL(id))}
      />
    </>
  );
};

export default ClubPhotoEdit;
