import { ApartmentOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { ClubsAsync } from "./Clubs.async";
import { ClubPageAsync } from "./ClubPage.async";
import { ClubEditAsync } from "./ClubEdit.async";
import { ClubAddressEditAsync } from "./ClubAddressEdit.async";
import { ClubPhotosEditAsync } from "./ClubPhotosEdit.async";

export enum ClubsSlugsEnum {
  clubs = "clubs",
  club = "club",
  club_edit = "club_edit",
  club_address_edit = "club_address_edit",
  club_photos_edit = "club_photos_edit"
}

export const clubRoutes: IRoutes<ClubsSlugsEnum> = {
  clubs: {
    URL: () => "/clubs",
    element: <ClubsAsync />,
    title: "Клубы",
    public: false,
    mainMenu: true,
    icon: <ApartmentOutlined />
  },
  club: {
    URL: (id = ":id") => `/clubs/${id}`,
    element: <ClubPageAsync />,
    title: "Клуб",
    public: false,
    mainMenu: false
  },
  club_edit: {
    URL: (id = ":id") => `/clubs/edit/${id}`,
    element: <ClubEditAsync />,
    title: "Редактирование клуба",
    public: false,
    mainMenu: false
  },
  club_address_edit: {
    URL: (id = ":id") => `/clubs/address/${id}/edit`,
    element: <ClubAddressEditAsync />,
    title: "Редактирование адреса клуба",
    public: false,
    mainMenu: false
  },

  club_photos_edit: {
    URL: (id = ":id") => `/clubs/${id}/photos`,
    element: <ClubPhotosEditAsync />,
    title: "Редактирование фото клуба",
    public: false,
    mainMenu: false
  }
};
