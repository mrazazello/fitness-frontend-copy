import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const AuthorizationAsync = lazy(() => import("./Authorization"));
const LogoutAsync = lazy(() => import("./Logout"));
import { AuthorizeSlugsEnum, authorizeRoutesPaths } from "./routesPaths";

export const authorizeRoutes: IRoutes<AuthorizeSlugsEnum> = {
  login: {
    ...authorizeRoutesPaths.login,
    element: <AuthorizationAsync />
  },
  logout: {
    ...authorizeRoutesPaths.logout,
    element: <LogoutAsync />
  }
};
