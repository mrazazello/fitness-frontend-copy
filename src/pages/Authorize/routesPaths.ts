import type { IRoutesPaths } from "@shared/models/routes";

export enum AuthorizeSlugsEnum {
  login = "login",
  logout = "logout"
}

export const authorizeRoutesPaths: IRoutesPaths<AuthorizeSlugsEnum> = {
  login: {
    URL: () => "/admin",
    title: "Авторизация",
    public: true,
    mainMenu: false
  },
  logout: {
    URL: () => "/logout",
    title: "Выход",
    public: false,
    mainMenu: false
  }
};
