import { CommentOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const FormQueriesAsync = lazy(() => import("./FormQueries"));
const FormQueriesPageAsync = lazy(() => import("./FormQueriesPage"));

import { FormQueriesSlugsEnum, formsRoutesPaths } from "./routesPaths";

export const formsRoutes: IRoutes<FormQueriesSlugsEnum> = {
  form_queries: {
    ...formsRoutesPaths.form_queries,
    element: <FormQueriesAsync />,
    icon: <CommentOutlined />
  },
  form_querie: {
    ...formsRoutesPaths.form_querie,
    element: <FormQueriesPageAsync />
  }
};
