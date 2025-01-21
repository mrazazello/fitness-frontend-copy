import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { clubsSelectors, useClubsSelectItems } from "@entities/club";
import {
  CoachEditForm,
  coachActions,
  editCoach,
  fetchCoach,
  getCoachDetail,
  getCoachsLoading
} from "@entities/coachs";
import type {
  ICoachEditArgs,
  ICoachsEditValues
} from "@entities/coachs/model/types/coachs";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import getFullName from "@shared/utils/getFullName";

import PageNotFound from "../404/PageNotFound";
import { coachsRoutesPaths } from "./routesPaths";

const CoachEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(coachActions.resetDetail());
    navigateBack(coachsRoutesPaths.coachs.URL());
  }, []);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchCoach(id));
  }, [id]);

  const clubs = useAppSelector(clubsSelectors.selectAll);
  const coachDetail = useAppSelector(getCoachDetail);
  const loading = useAppSelector(getCoachsLoading);
  const { clubsSelectOptions } = useClubsSelectItems();

  const handleCoachEdit = useCallback(
    (values: ICoachsEditValues) => {
      if (!coachDetail || !values.photo || !values.photo[0]?.response?.code)
        return;

      const request: ICoachEditArgs = {
        ...values,
        code: coachDetail?.code,
        photo: convertIFileResponseToPhotoListItem(values.photo[0].response),
        clubs: clubs
          .filter((item) => values.clubCodes.includes(item.code))
          .map((item) => ({
            code: item.code,
            name: item.name,
            contactPhone: item.contactPhone
          }))
      };
      void dispatch(editCoach(request));
    },
    [coachDetail, clubs]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!coachDetail) return null;

  return (
    <>
      <PageHeader
        title={`${coachsRoutesPaths.coach_edit.title}: ${getFullName(
          coachDetail.firstName,
          coachDetail.lastName
        )}`}
        onBack={onBack}
      />
      <CoachEditForm
        coachDetail={coachDetail}
        loading={loading === "loading"}
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleCoachEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default CoachEdit;
