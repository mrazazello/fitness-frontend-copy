import { SnippetsOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { DocsAsync } from "./Docs.async";
import { DocCreateAsync } from "./DocCreate.async";
import { DocEditAsync } from "./DocEdit.async";

export enum DocsSlugsEnum {
  docs = "docs",
  doc_create = "doc_create",
  doc_edit = "doc_edit"
}

export const docsRoutes: IRoutes<DocsSlugsEnum> = {
  docs: {
    URL: () => "/docs",
    element: <DocsAsync />,
    title: "Документы",
    public: false,
    mainMenu: true,
    icon: <SnippetsOutlined />
  },
  doc_create: {
    URL: () => "/docs/create",
    element: <DocCreateAsync />,
    title: "Добавление документа",
    public: false,
    mainMenu: false
  },
  doc_edit: {
    URL: (id = ":id") => `/docs/${id}/edit`,
    element: <DocEditAsync />,
    title: "Редактирование документа",
    public: false,
    mainMenu: false
  }
};
