import { ApartmentOutlined } from "@ant-design/icons";
import { lazy } from "react";

import type { IRoutes } from "@shared/models/routes";

const ClubsAsync = lazy(() => import("./Clubs"));
const ClubPageAsync = lazy(() => import("./ClubPage"));
const ClubEditAsync = lazy(() => import("./ClubEdit"));
const ClubAddressEditAsync = lazy(() => import("./ClubAddressEdit"));
const ClubPhotosEditAsync = lazy(() => import("./ClubPhotosEdit"));

import { ClubsSlugsEnum, clubRoutesPaths } from "./routesPaths";

export const clubRoutes: IRoutes<ClubsSlugsEnum> = {
  clubs: {
    ...clubRoutesPaths.clubs,
    element: <ClubsAsync />,
    icon: <ApartmentOutlined />
  },
  club: {
    ...clubRoutesPaths.club,
    element: <ClubPageAsync />
  },
  club_edit: {
    ...clubRoutesPaths.club_edit,
    element: <ClubEditAsync />
  },
  club_address_edit: {
    ...clubRoutesPaths.club_address_edit,
    element: <ClubAddressEditAsync />
  },

  club_photos_edit: {
    ...clubRoutesPaths.club_photos_edit,
    element: <ClubPhotosEditAsync />
  }
};
