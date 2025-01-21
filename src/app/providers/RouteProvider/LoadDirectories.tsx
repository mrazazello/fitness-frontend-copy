import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { fetchClubs } from "@entities/club";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import Preloader from "@shared/ui/Preloader/Preloader";

const LoadDirectories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  // грузим полезные справочники один раз
  useEffect(() => {
    const loadDirectories = async () => {
      await dispatch(fetchClubs());
      setIsLoading(false);
    };
    if (isLoading) loadDirectories();
  }, [isLoading]);

  return isLoading ? (
    <Preloader message="Loading directories..." />
  ) : (
    <Outlet />
  );
};

export default LoadDirectories;
