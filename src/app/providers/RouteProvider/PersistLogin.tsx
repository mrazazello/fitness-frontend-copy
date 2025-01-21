import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getAccessToken, refreshToken } from "@entities/auth";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import Preloader from "@shared/ui/Preloader/Preloader";

const PersistLogin = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const [isTokenLoading, setIsTokenLoading] = useState(!accessToken);

  useEffect(() => {
    const veryfyRefreshToken = async () => {
      await dispatch(refreshToken());
      setIsTokenLoading(false);
    };
    if (isTokenLoading) veryfyRefreshToken();
  }, [isTokenLoading]);

  return isTokenLoading ? <Preloader message="Authorizing..." /> : <Outlet />;
};

export default PersistLogin;
