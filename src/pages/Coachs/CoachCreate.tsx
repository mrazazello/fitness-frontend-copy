import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ICoachCreateArgs,
  ICoachsCreateValues
} from "@entities/coachs/model/types/coachs";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import { CoachEditForm, createCoach } from "@entities/coachs";
import { clubsSelectors, useClubsSelectItems } from "@entities/club";

import { coachsRoutes } from "./Routes";

const CoachCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clubs = useAppSelector(clubsSelectors.selectAll);
  const { clubsSelectOptions } = useClubsSelectItems();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleCreateCoach = useCallback(
    async (values: ICoachsCreateValues) => {
      if (!values.photo || !values.photo[0].response?.code) return;

      const request: ICoachCreateArgs = {
        ...values,
        photo: convertIFileResponseToPhotoListItem(values.photo[0].response),
        clubs: clubs
          .filter((item) => values.clubCodes?.includes(item.code))
          .map((item) => ({
            code: item.code,
            name: item.name,
            contactPhone: item.contactPhone
          }))
      };
      await dispatch(createCoach(request)).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          navigate(coachsRoutes.coachs.URL());
      });
    },
    [clubs]
  );

  return (
    <>
      <PageHeader
        title={coachsRoutes.coach_create.title}
        onBack={() => navigate(coachsRoutes.coachs.URL())}
      />
      <CoachEditForm
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleCreateCoach}
        onCancel={() => navigate(coachsRoutes.coachs.URL())}
      />
    </>
  );
};

export default CoachCreatePage;
