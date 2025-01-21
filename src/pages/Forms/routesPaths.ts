import type { IRoutesPaths } from "@shared/models/routes";

export enum FormQueriesSlugsEnum {
  form_queries = "form_queries",
  form_querie = "form_querie"
}

export const formsRoutesPaths: IRoutesPaths<FormQueriesSlugsEnum> = {
  form_queries: {
    URL: () => `/form-queries`,
    title: "Обратная связь",
    public: false,
    mainMenu: true
  },
  form_querie: {
    URL: (id = ":id") => `/form-queries/${id}`,
    title: "Обратная связь",
    public: false,
    mainMenu: false
  }
};
