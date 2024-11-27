import { UserOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { CoachsAsync } from "./Coachs.async";
import { CoachCreateAsync } from "./CoachCreate.async";
import { CoachEditAsync } from "./CoachEdit.async";

export enum CoachsSlugsEnum {
  coachs = "coachs",
  coach_create = "coach_create",
  coach_edit = "coach_edit"
}

export const coachsRoutes: IRoutes<CoachsSlugsEnum> = {
  coachs: {
    URL: () => "/coachs",
    element: <CoachsAsync />,
    title: "Тренеры",
    public: false,
    mainMenu: true,
    icon: <UserOutlined />
  },
  coach_create: {
    URL: () => "/coachs/create",
    element: <CoachCreateAsync />,
    title: "Добавление тренера",
    public: false,
    mainMenu: false
  },
  coach_edit: {
    URL: (id = ":id") => `/coachs/${id}/edit`,
    element: <CoachEditAsync />,
    title: "Редактирование тренера",
    public: false,
    mainMenu: false
  }
};
