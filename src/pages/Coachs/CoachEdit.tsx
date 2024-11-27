import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ICoachEditArgs,
  ICoachsEditValues
} from "@entities/coachs/model/types/coachs";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import getFullName from "@shared/utils/getFullName";
import {
  CoachEditForm,
  editCoach,
  fetchCoach,
  getCoachDetail,
  getCoachsLoading
} from "@entities/coachs";
import { clubsSelectors, useClubsSelectItems } from "@entities/club";

import PageNotFound from "../404/PageNotFound";

import { coachsRoutes } from "./Routes";

const CoachEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        code: coachDetail?.code,
        ...values,
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
        title={`${coachsRoutes.coach_edit.title}: ${getFullName(
          coachDetail.firstName,
          coachDetail.lastName
        )}`}
        onBack={() => navigate(coachsRoutes.coachs.URL())}
      />
      <CoachEditForm
        coachDetail={coachDetail}
        loading={loading === "loading"}
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleCoachEdit}
        onCancel={() => navigate(coachsRoutes.coachs.URL())}
      />
    </>
  );
};

export default CoachEdit;
