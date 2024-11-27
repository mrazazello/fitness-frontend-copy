import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";

import Preloader from "@shared/ui/Preloader/Preloader";

import { AdminLayoutTemplate } from "../../layouts/AdminLayoutTemplate";
import { PublicLayoutTemplate } from "../../layouts/PublicLayoutTemplate";

import frontendPaths from "./routes";
import PersistLogin from "./PersistLogin";
import RequireAuth from "./RequareAuth";
import LoadDirectories from "./LoadDirectories";

const publicPaths = Object.values(frontendPaths)
  .filter((item) => item.public === true)
  .map((item) => ({
    path: item.URL(),
    element: item.element
  }));

const privatePaths = Object.values(frontendPaths)
  .filter((item) => item.public === false)
  .map((item) => ({
    path: item.URL(),
    element: item.element
  }));

const Routes = () => {
  return useRoutes([
    {
      element: <PublicLayoutTemplate />,
      children: publicPaths
    },
    {
      element: <AdminLayoutTemplate />,
      children: [
        {
          element: <PersistLogin />,
          children: [
            {
              element: <RequireAuth />,
              children: [
                {
                  element: <LoadDirectories />,
                  children: privatePaths
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
};

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
};
