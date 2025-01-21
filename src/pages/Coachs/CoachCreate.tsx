import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";

import { clubsSelectors, useClubsSelectItems } from "@entities/club";
import { CoachEditForm, createCoach } from "@entities/coachs";
import type {
  ICoachCreateArgs,
  ICoachsCreateValues
} from "@entities/coachs/model/types/coachs";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";

import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { coachsRoutesPaths } from "./routesPaths";

const CoachCreatePage = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(coachsRoutesPaths.coachs.URL());

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
        if (res.meta.requestStatus === "fulfilled") onBack();
      });
    },
    [clubs]
  );

  return (
    <>
      <PageHeader
        title={coachsRoutesPaths.coach_create.title}
        onBack={onBack}
      />
      <CoachEditForm
        clubsSelectOptions={clubsSelectOptions}
        onSave={handleCreateCoach}
        onCancel={onBack}
      />
    </>
  );
};

export default CoachCreatePage;
