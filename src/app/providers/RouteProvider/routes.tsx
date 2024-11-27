import { pageNotFoundRoutes } from "@pages/404/Routes";
import { authorizeRoutes } from "@pages/Authorize/Routes";
import { dashboardRoutes } from "@pages/Dashboard/Routes";
import { clubRoutes } from "@pages/Clubs/Routes";
import { coachsRoutes } from "@pages/Coachs/Routes";
import { programmsRoutes } from "@pages/Programms/Routes";
import { scheduleRoutes } from "@pages/Schedule/Routes";
import { newsRoutes } from "@pages/News/Routes";
import { docsRoutes } from "@pages/Docs/Routes";
import { productsRoutes } from "@pages/Products/Routes";
import { promocodesRoutes } from "@pages/Promocodes/Routes";
import { offersRoutes } from "@pages/Offers/Routes";
import { ordersRoutes } from "@pages/Orders/Routes";
import { formsRoutes } from "@pages/Forms/Routes";
import { slidersRoutes } from "@pages/Sliders/Routes";

const routes = {
  ...pageNotFoundRoutes,
  ...authorizeRoutes,
  ...dashboardRoutes, // main page
  ...clubRoutes,
  ...coachsRoutes,
  ...programmsRoutes,
  ...scheduleRoutes,
  ...newsRoutes,
  ...docsRoutes,
  ...productsRoutes,
  ...promocodesRoutes,
  ...offersRoutes,
  ...ordersRoutes,
  ...formsRoutes,
  ...slidersRoutes
};

export default routes;
