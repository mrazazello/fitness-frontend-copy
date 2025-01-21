import { ExclamationCircleOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const SliderCreateAsync = lazy(() => import("./SliderCreate"));
const SliderEditAsync = lazy(() => import("./SliderEdit"));
const SlidersAsync = lazy(() => import("./Sliders"));

import { SlidersSlugsEnum, slidersRoutesPaths } from "./routesPaths";

export const slidersRoutes: IRoutes<SlidersSlugsEnum> = {
  sliders: {
    ...slidersRoutesPaths.sliders,
    element: <SlidersAsync />,
    icon: <ExclamationCircleOutlined />
  },
  slider_create: {
    ...slidersRoutesPaths.slider_create,
    element: <SliderCreateAsync />
  },
  slider_edit: {
    ...slidersRoutesPaths.slider_edit,
    element: <SliderEditAsync />
  }
};
