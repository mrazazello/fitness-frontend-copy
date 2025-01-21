import type { IRoutesPaths } from "@shared/models/routes";

export enum ClubsSlugsEnum {
  clubs = "clubs",
  club = "club",
  club_edit = "club_edit",
  club_address_edit = "club_address_edit",
  club_photos_edit = "club_photos_edit"
}

export const clubRoutesPaths: IRoutesPaths<ClubsSlugsEnum> = {
  clubs: {
    URL: () => "/clubs",
    title: "Клубы",
    public: false,
    mainMenu: true
  },
  club: {
    URL: (id = ":id") => `/clubs/${id}`,
    title: "Клуб",
    public: false,
    mainMenu: false
  },
  club_edit: {
    URL: (id = ":id") => `/clubs/edit/${id}`,
    title: "Редактирование клуба",
    public: false,
    mainMenu: false
  },
  club_address_edit: {
    URL: (id = ":id") => `/clubs/address/${id}/edit`,
    title: "Редактирование адреса клуба",
    public: false,
    mainMenu: false
  },

  club_photos_edit: {
    URL: (id = ":id") => `/clubs/${id}/photos`,
    title: "Редактирование фото клуба",
    public: false,
    mainMenu: false
  }
};
