import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/index";
import { LoginForm, getAccessToken, getAuthIsLoading } from "@entities/auth";
import { errorActions } from "@shared/api/error";

import { dashboardRoutes } from "../Dashboard/Routes";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(getAuthIsLoading);
  const accessToken = useAppSelector(getAccessToken);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  useEffect(() => {
    if (loading === "idle" && accessToken !== null) {
      navigate(dashboardRoutes.main.URL(), { replace: true });
    }
  }, [loading, accessToken]);

  return (
    <>
      <PageHeader title="Авторизация" />
      <LoginForm loading={loading === "loading"} />
    </>
  );
};

export default Authorization;
