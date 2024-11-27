import { CommentOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { FormQueriesAsync } from "./FormQueries.async";
import { FormQueriesPageAsync } from "./FormQueriesPage.async";

export enum FormQueriesSlugsEnum {
  form_queries = "form_queries",
  form_querie = "form_querie"
}

export const formsRoutes: IRoutes<FormQueriesSlugsEnum> = {
  form_queries: {
    URL: () => `/form-queries`,
    element: <FormQueriesAsync />,
    title: "Обратная связь",
    public: false,
    mainMenu: true,
    icon: <CommentOutlined />
  },
  form_querie: {
    URL: (id = ":id") => `/form-queries/${id}`,
    element: <FormQueriesPageAsync />,
    title: "Обратная связь",
    public: false,
    mainMenu: false
  }
};
