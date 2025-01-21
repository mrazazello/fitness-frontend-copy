import { SnippetsOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const DocCreateAsync = lazy(() => import("./DocCreate"));
const DocEditAsync = lazy(() => import("./DocEdit"));
const DocsAsync = lazy(() => import("./Docs"));

import type { DocsSlugsEnum } from "./routesPaths";
import { docsRoutesPaths } from "./routesPaths";

export const docsRoutes: IRoutes<DocsSlugsEnum> = {
  docs: {
    ...docsRoutesPaths.docs,
    element: <DocsAsync />,
    icon: <SnippetsOutlined />
  },
  doc_create: {
    ...docsRoutesPaths.doc_create,
    element: <DocCreateAsync />
  },
  doc_edit: {
    ...docsRoutesPaths.doc_edit,
    element: <DocEditAsync />
  }
};
