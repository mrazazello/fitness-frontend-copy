import type { IRoutesPaths } from "@shared/models/routes";

export enum DocsSlugsEnum {
  docs = "docs",
  doc_create = "doc_create",
  doc_edit = "doc_edit"
}

export const docsRoutesPaths: IRoutesPaths<DocsSlugsEnum> = {
  docs: {
    URL: () => "/docs",
    title: "Документы",
    public: false,
    mainMenu: true
  },
  doc_create: {
    URL: () => "/docs/create",
    title: "Добавление документа",
    public: false,
    mainMenu: false
  },
  doc_edit: {
    URL: (id = ":id") => `/docs/${id}/edit`,
    title: "Редактирование документа",
    public: false,
    mainMenu: false
  }
};
