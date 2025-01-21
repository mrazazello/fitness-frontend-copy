import { Button, Card, Col, PageHeader, Row, Space, Typography } from "antd";
import { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ClubCard,
  clubActions,
  fetchClub,
  fetchClubAddress,
  getClubAddress,
  getClubDetail,
  getClubLoading
} from "@entities/club";
import { ClubAreasList } from "@entities/clubAreas";
import { ClubOptionList } from "@entities/clubOptions";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { clubRoutesPaths } from "./routesPaths";

const { Title } = Typography;

const ClubPage = () => {
  const { id } = useParams();
  const { navigateBack } = useNavigateBack();
  const dispatch = useAppDispatch();

  const onBack = useCallback(() => {
    dispatch(clubActions.resetDetail());
    navigateBack(clubRoutesPaths.clubs.URL());
  }, []);

  useEffect(() => {
    dispatch(errorActions.resetErrors());
    if (id) {
      void dispatch(fetchClub(id));
      void dispatch(fetchClubAddress(id));
    }
  }, [id]);

  const clubDetail = useAppSelector(getClubDetail);
  const loading = useAppSelector(getClubLoading);
  const clubAddress = useAppSelector(getClubAddress);

  if (!id || loading === "failed") return <PageNotFound />;

  return (
    <>
      <PageHeader
        title={`${clubRoutesPaths.club.title}: ${clubDetail?.clubName}`}
        onBack={onBack}
      />
      <Card
        loading={loading === "loading"}
        title={<Title level={5}>Параметры клуба</Title>}
        extra={
          <Space>
            <Link to={clubRoutesPaths.club_edit.URL(id)}>
              <Button type="primary">{clubRoutesPaths.club_edit.title}</Button>
            </Link>
            <Link to={clubRoutesPaths.club_address_edit.URL(id)}>
              <Button type="primary">
                {clubRoutesPaths.club_address_edit.title}
              </Button>
            </Link>
            <Link to={clubRoutesPaths.club_photos_edit.URL(id)}>
              <Button type="primary">
                {clubRoutesPaths.club_photos_edit.title}
              </Button>
            </Link>
          </Space>
        }
      >
        <ShowErrorMessages />
        <ClubCard clubDetail={clubDetail} clubAddress={clubAddress} />
      </Card>
      <Row gutter={8}>
        <Col span={12}>
          <ClubAreasList clubId={id} />
        </Col>
        <Col span={12}>
          <ClubOptionList clubId={id} />
        </Col>
      </Row>
    </>
  );
};

export default ClubPage;
