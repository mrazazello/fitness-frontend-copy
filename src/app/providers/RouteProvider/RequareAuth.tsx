import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getAccessToken } from "@entities/auth";
import { useAppSelector } from "@shared/hooks/useAppStore";

import frontendPaths from "./routes";

const RequireAuth = () => {
  const accessToken = useAppSelector(getAccessToken);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate
      to={frontendPaths.login.URL()}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
