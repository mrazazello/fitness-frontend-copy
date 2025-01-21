import { UserOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const CoachCreateAsync = lazy(() => import("./CoachCreate"));
const CoachEditAsync = lazy(() => import("./CoachEdit"));
const CoachsAsync = lazy(() => import("./Coachs"));

import type { CoachsSlugsEnum } from "./routesPaths";
import { coachsRoutesPaths } from "./routesPaths";

export const coachsRoutes: IRoutes<CoachsSlugsEnum> = {
  coachs: {
    ...coachsRoutesPaths.coachs,
    element: <CoachsAsync />,
    icon: <UserOutlined />
  },
  coach_create: {
    ...coachsRoutesPaths.coach_create,
    element: <CoachCreateAsync />
  },
  coach_edit: {
    ...coachsRoutesPaths.coach_edit,
    element: <CoachEditAsync />
  }
};
