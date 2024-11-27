import { Card, PageHeader } from "antd";
import { useEffect } from "react";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import { ClubsList, clubsSelectors, getClubLoading } from "@entities/club";
import { useAppDispatch, useAppSelector } from "@app/index";

import { clubRoutes } from "./Routes";

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
      <PageHeader title={clubRoutes.clubs.title} />
      <Card>
        <ShowErrorMessages />
        <ClubsList
          clubs={clubs}
          loading={loading === "loading"}
          clubURL={clubRoutes.club.URL}
        />
      </Card>
    </>
  );
};

export default ClubsPage;
