import { InfoCircleOutlined } from "@ant-design/icons";

import { IRoutes } from "@shared/models/routes";

import { NewsAsync } from "./News.async";
import { NewsCreateAsync } from "./NewsCreate.async";
import { NewsEditAsync } from "./NewsEdit.async";

export enum NewsSlugsEnum {
  news = "news",
  news_create = "news_create",
  news_edit = "news_edit"
}

export const newsRoutes: IRoutes<NewsSlugsEnum> = {
  news: {
    URL: () => "/news",
    element: <NewsAsync />,
    title: "Новости",
    public: false,
    mainMenu: true,
    icon: <InfoCircleOutlined />
  },
  news_create: {
    URL: () => "/news/create",
    element: <NewsCreateAsync />,
    title: "Добавление новости",
    public: false,
    mainMenu: false
  },
  news_edit: {
    URL: (id = ":id") => `/news/${id}/edit`,
    element: <NewsEditAsync />,
    title: "Редактирование новости",
    public: false,
    mainMenu: false
  }
};
