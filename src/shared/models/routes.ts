import type { ReactNode } from "react";

export type IRoutesPaths<K extends string> = {
  [key in K]: {
    readonly URL: (id?: string) => string;
    readonly title: string;
    readonly public: boolean;
    readonly mainMenu: boolean;
    readonly children?: IRoutes<K>;
  };
};

export type IRoutes<K extends string> = {
  [key in K]: IRoutesPaths<K>[key] & {
    readonly element: ReactNode;
    readonly icon?: ReactNode;
  };
};

// export type IRoutes<K extends string> = {
//   [key in K]: {
//     readonly URL: (id?: string) => string;
//     readonly title: string;
//     readonly element: JSX.Element;
//     readonly public: boolean;
//     readonly mainMenu: boolean;
//     readonly children?: IRoutes<K>;
//     icon?: ReactNode;
//   };
// };
