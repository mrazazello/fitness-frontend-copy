import { CoffeeOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const OfferCreateAsync = lazy(() => import("./OfferCreate"));
const OfferEditAsync = lazy(() => import("./OfferEdit"));
const OffersAsync = lazy(() => import("./Offers"));

import { OffersSlugsEnum, offersRoutesPaths } from "./routesPaths";

export const offersRoutes: IRoutes<OffersSlugsEnum> = {
  offers: {
    ...offersRoutesPaths.offers,
    element: <OffersAsync />,
    icon: <CoffeeOutlined />
  },
  offer_create: {
    ...offersRoutesPaths.offer_create,
    element: <OfferCreateAsync />
  },
  offer_edit: {
    ...offersRoutesPaths.offer_edit,
    element: <OfferEditAsync />
  }
};
