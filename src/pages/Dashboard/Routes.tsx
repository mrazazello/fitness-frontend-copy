import { HomeOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const DashboardAsync = lazy(() => import("./Dashboard"));

import type { DashboardSlugsEnum } from "./routesPaths";
import { dashboardRoutesPaths } from "./routesPaths";

export const dashboardRoutes: IRoutes<DashboardSlugsEnum> = {
  main: {
    ...dashboardRoutesPaths.main,
    element: <DashboardAsync />,
    icon: <HomeOutlined />
  }
};
