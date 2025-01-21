import { MenuOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const ProgrammCreateAsync = lazy(() => import("./ProgrammCreate"));
const ProgrammEditAsync = lazy(() => import("./ProgrammEdit"));
const ProgrammsAsync = lazy(() => import("./Programms"));

import type { ProgrammsSlugsEnum } from "./routesPaths";
import { programmsRoutesPaths } from "./routesPaths";

export const programmsRoutes: IRoutes<ProgrammsSlugsEnum> = {
  programms: {
    ...programmsRoutesPaths.programms,
    element: <ProgrammsAsync />,
    icon: <MenuOutlined />
  },
  programm_edit: {
    ...programmsRoutesPaths.programm_edit,
    element: <ProgrammEditAsync />
  },
  programm_create: {
    ...programmsRoutesPaths.programm_create,
    element: <ProgrammCreateAsync />
  }
};
