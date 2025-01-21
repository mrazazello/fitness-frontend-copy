import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm, getAccessToken, getAuthIsLoading } from "@entities/auth";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";

import { dashboardRoutesPaths } from "@pages/Dashboard/routesPaths";

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
      navigate(dashboardRoutesPaths.main.URL(), { replace: true });
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
