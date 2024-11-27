import { MenuOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { ProgrammsAsync } from "./Programms.async";
import { ProgrammEditAsync } from "./ProgrammEdit.async";
import { ProgrammCreateAsync } from "./ProgrammCreate.async";

export enum ProgrammsSlugsEnum {
  programms = "programms",
  programm_edit = "programm_edit",
  programm_create = "programm_create"
}

export const programmsRoutes: IRoutes<ProgrammsSlugsEnum> = {
  programms: {
    URL: () => "/programms",
    element: <ProgrammsAsync />,
    title: "Программы",
    public: false,
    mainMenu: true,
    icon: <MenuOutlined />
  },
  programm_edit: {
    URL: (id = ":id") => `/programms/${id}/edit`,
    element: <ProgrammEditAsync />,
    title: "Редактирование программы",
    public: false,
    mainMenu: false
  },
  programm_create: {
    URL: () => "/programms/create",
    element: <ProgrammCreateAsync />,
    title: "Добавление программы",
    public: false,
    mainMenu: false
  }
};
