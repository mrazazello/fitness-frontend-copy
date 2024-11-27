import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Preloader from "@shared/ui/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "@app/index";
import { getAccessToken, refreshToken } from "@entities/auth";

const PersistLogin = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const [isTokenLoading, setIsTokenLoading] = useState(!accessToken);

  useEffect(() => {
    const veryfyRefreshToken = async () => {
      await dispatch(refreshToken());
      setIsTokenLoading(false);
    };
    isTokenLoading && veryfyRefreshToken();
  }, [isTokenLoading]);

  return isTokenLoading ? <Preloader message="Authorizing..." /> : <Outlet />;
};

export default PersistLogin;