import { useCallback } from "react";
import type { To } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export type TLocationState = {
  state: {
    from?: {
      search?: string;
    };
  };
};

export const useNavigateBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as TLocationState["state"];

  const navigateSave = useCallback(
    (url: To) => {
      navigate(url, { state: { from: { search: location.search } } });
    },
    [location]
  );

  const navigateBack = useCallback(
    (url: To) => {
      navigate(`${url}${state?.from?.search || ""}`);
    },
    [state]
  );

  return { navigateSave, navigateBack };
};
