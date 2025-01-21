import { Card, PageHeader } from "antd";
import { useEffect } from "react";

import { ClubsList, clubsSelectors, getClubLoading } from "@entities/club";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { clubRoutesPaths } from "./routesPaths";

const ClubsPage = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getClubLoading);
  const clubs = addReactKeyByProperty(
    useAppSelector(clubsSelectors.selectAll),
    "code"
  );

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  return (
    <>
      <PageHeader title={clubRoutesPaths.clubs.title} />
      <Card>
        <ShowErrorMessages />
        <ClubsList
          clubs={clubs}
          loading={loading === "loading"}
          clubURL={clubRoutesPaths.club.URL}
        />
      </Card>
    </>
  );
};

export default ClubsPage;
