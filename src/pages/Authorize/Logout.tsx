import { useEffect } from "react";

import { useLogout } from "@entities/auth";

const LogoutPage = () => {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, []);

  return null;
};

export default LogoutPage;
