import { ReactNode } from "react";

export type IRoutes<K extends string> = {
  [key in K]: {
    readonly URL: (id?: string) => string;
    readonly title: string;
    readonly element: JSX.Element;
    readonly public: boolean;
    readonly mainMenu: boolean;
    readonly children?: IRoutes<K>;
    icon?: ReactNode;
  };
};
