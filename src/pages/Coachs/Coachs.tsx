import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { ICoachListItem } from "@entities/coachs/model/types/coachs";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  CoachList,
  coachsSelectors,
  fetchCoachs,
  getCoachsLoading
} from "@entities/coachs";
import { useClubsSelectItems } from "@entities/club";

import { coachsRoutes } from "./Routes";

const Coachs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchCoachs());
  }, []);

  const loading = useAppSelector(getCoachsLoading);
  const coachs = addReactKeyByProperty<ICoachListItem>(
    useAppSelector(coachsSelectors.selectAll),
    "code"
  );
  const { clubsFilterOptions } = useClubsSelectItems();

  return (
    <>
      <PageHeader
        title={coachsRoutes.coachs.title}
        extra={
          <Link to={coachsRoutes.coach_create.URL()}>
            <Button type="primary">{coachsRoutes.coach_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <CoachList
          coachs={coachs}
          loading={loading === "loading"}
          clubsFilterOptions={clubsFilterOptions}
          onEdit={(code: string) => navigate(coachsRoutes.coach_edit.URL(code))}
        />
      </Card>
    </>
  );
};

export default Coachs;
