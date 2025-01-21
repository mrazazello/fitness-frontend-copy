import { InfoCircleOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const NewsAsync = lazy(() => import("./News"));
const NewsCreateAsync = lazy(() => import("./NewsCreate"));
const NewsEditAsync = lazy(() => import("./NewsEdit"));

import { NewsSlugsEnum, newsRoutesPaths } from "./routesPaths";

export const newsRoutes: IRoutes<NewsSlugsEnum> = {
  news: {
    ...newsRoutesPaths.news,
    element: <NewsAsync />,
    icon: <InfoCircleOutlined />
  },
  news_create: {
    ...newsRoutesPaths.news_create,
    element: <NewsCreateAsync />
  },
  news_edit: {
    ...newsRoutesPaths.news_edit,
    element: <NewsEditAsync />
  }
};
