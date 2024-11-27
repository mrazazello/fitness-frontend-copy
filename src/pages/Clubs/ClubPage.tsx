import { Button, Card, Col, PageHeader, Row, Space, Typography } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ClubCard,
  fetchClub,
  fetchClubAddress,
  getClubAddress,
  getClubDetail,
  getClubLoading
} from "@entities/club";
import { ClubOptionList } from "@entities/clubOptions";
import { ClubAreasList } from "@entities/clubAreas";

import PageNotFound from "../404/PageNotFound";

import { clubRoutes } from "./Routes";

const { Title } = Typography;

const ClubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        title={`${clubRoutes.club.title}: ${clubDetail?.clubName}`}
        onBack={() => navigate(clubRoutes.clubs.URL())}
      />
      <Card
        loading={loading === "loading"}
        title={<Title level={5}>Параметры клуба</Title>}
        extra={
          <Space>
            <Link to={clubRoutes.club_edit.URL(id)}>
              <Button type="primary">{clubRoutes.club_edit.title}</Button>
            </Link>
            <Link to={clubRoutes.club_address_edit.URL(id)}>
              <Button type="primary">
                {clubRoutes.club_address_edit.title}
              </Button>
            </Link>
            <Link to={clubRoutes.club_photos_edit.URL(id)}>
              <Button type="primary">
                {clubRoutes.club_photos_edit.title}
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
