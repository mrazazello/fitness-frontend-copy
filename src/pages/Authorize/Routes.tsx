import { IRoutes } from "@shared/models/routes";
import { LogoutAsync } from "@pages/Authorize/Logout.async";

import { AuthorizationAsync } from "./Authorization.async";

export enum AuthorizeSlugsEnum {
  login = "login",
  logout = "logout"
}

export const authorizeRoutes: IRoutes<AuthorizeSlugsEnum> = {
  login: {
    URL: () => "/admin",
    element: <AuthorizationAsync />,
    title: "Авторизация",
    public: true,
    mainMenu: false
  },
  logout: {
    URL: () => "/logout",
    element: <LogoutAsync />,
    title: "Выход",
    public: false,
    mainMenu: false
  }
};
