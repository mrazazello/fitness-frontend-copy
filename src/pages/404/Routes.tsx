import { IRoutes } from "@shared/models/routes";

import { PageNotFoundAsync } from "./PageNotFound.async";

export enum PagenotFondSlugsEnum {
  page_not_found = "page_not_found"
}

export const pageNotFoundRoutes: IRoutes<PagenotFondSlugsEnum> = {
  page_not_found: {
    URL: () => "*",
    element: <PageNotFoundAsync />,
    title: "Страница не найдена",
    public: true,
    mainMenu: false
  }
};
