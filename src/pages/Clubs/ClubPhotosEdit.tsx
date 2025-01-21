import { PageHeader } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  ClubPhotosEditForm,
  clubActions,
  fetchClub,
  fetchClubPhotos,
  getClubDetail,
  getClubLoading,
  getClubPhotos
} from "@entities/club";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { clubRoutesPaths } from "./routesPaths";

const ClubPhotoEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(clubRoutesPaths.club.URL(id));

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
        title={`${clubRoutesPaths.club_photos_edit.title}: ${clubDetail.clubName}`}
        onBack={onBack}
      />
      <ClubPhotosEditForm
        clubId={id}
        clubPhotos={clubPhotos}
        loading={loading === "loading"}
        onCancel={onBack}
      />
    </>
  );
};

export default ClubPhotoEdit;
