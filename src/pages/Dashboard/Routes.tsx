import { HomeOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { DashboardAsync } from "./Dashboard.async";

export enum DashboardSlugsEnum {
  main = "main"
}

export const dashboardRoutes: IRoutes<DashboardSlugsEnum> = {
  main: {
    URL: () => "/",
    element: <DashboardAsync />,
    title: "Главная",
    public: false,
    mainMenu: true,
    icon: <HomeOutlined />
  }
};
