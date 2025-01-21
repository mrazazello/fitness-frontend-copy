import type { IRoutesPaths } from "@shared/models/routes";

export enum DashboardSlugsEnum {
  main = "main"
}

export const dashboardRoutesPaths: IRoutesPaths<DashboardSlugsEnum> = {
  main: {
    URL: () => "/",
    title: "Главная",
    public: false,
    mainMenu: true
  }
};
