import type { IRoutesPaths } from "@shared/models/routes";

export enum NewsSlugsEnum {
  news = "news",
  news_create = "news_create",
  news_edit = "news_edit"
}

export const newsRoutesPaths: IRoutesPaths<NewsSlugsEnum> = {
  news: {
    URL: () => "/news",
    title: "Новости",
    public: false,
    mainMenu: true
  },
  news_create: {
    URL: () => "/news/create",
    title: "Добавление новости",
    public: false,
    mainMenu: false
  },
  news_edit: {
    URL: (id = ":id") => `/news/${id}/edit`,
    title: "Редактирование новости",
    public: false,
    mainMenu: false
  }
};
