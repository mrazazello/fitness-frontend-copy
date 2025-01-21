import { useEffect } from "react";

import { useLogout } from "@entities/auth";
import { authorizeRoutesPaths } from "./routesPaths";

const LogoutPage = () => {
  const logout = useLogout();

  useEffect(() => {
    logout(authorizeRoutesPaths.login.URL());
  }, []);

  return null;
};

export default LogoutPage;
