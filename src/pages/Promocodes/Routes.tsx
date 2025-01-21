import { BarcodeOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const PromocodeCreateAsync = lazy(() => import("./PromocodeCreate"));
const PromocodeEditAsync = lazy(() => import("./PromocodeEdit"));
const PromocodesAsync = lazy(() => import("./Promocodes"));

import type { PromocodesSlugsEnum } from "./routesPaths";
import { promocodesRoutesPaths } from "./routesPaths";

export const promocodesRoutes: IRoutes<PromocodesSlugsEnum> = {
  promocodes: {
    ...promocodesRoutesPaths.promocodes,
    element: <PromocodesAsync />,
    icon: <BarcodeOutlined />
  },
  promocode_create: {
    ...promocodesRoutesPaths.promocode_create,
    element: <PromocodeCreateAsync />
  },
  promocode_edit: {
    ...promocodesRoutesPaths.promocode_edit,
    element: <PromocodeEditAsync />
  }
};
