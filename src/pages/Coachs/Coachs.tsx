import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";

import { useClubsSelectItems } from "@entities/club";
import {
  CoachList,
  coachsSelectors,
  fetchCoachs,
  getCoachsLoading
} from "@entities/coachs";
import type { ICoachListItem } from "@entities/coachs/model/types/coachs";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import { coachsRoutesPaths } from "./routesPaths";

const Coachs = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const { clubsFilterOptions } = useClubsSelectItems();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchCoachs());
  }, []);

  const loading = useAppSelector(getCoachsLoading);
  const coachs = addReactKeyByProperty<ICoachListItem>(
    useAppSelector(coachsSelectors.selectAll),
    "code"
  );

  const handleCoachCreate = () =>
    navigateSave(coachsRoutesPaths.coach_create.URL());

  return (
    <>
      <PageHeader
        title={coachsRoutesPaths.coachs.title}
        extra={
          <Button type="primary" onClick={handleCoachCreate}>
            {coachsRoutesPaths.coach_create.title}
          </Button>
        }
      />
      <Card>
        <ShowErrorMessages />
        <CoachList
          coachs={coachs}
          loading={loading === "loading"}
          clubsFilterOptions={clubsFilterOptions}
          onEdit={(code: string) =>
            navigateSave(coachsRoutesPaths.coach_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Coachs;
