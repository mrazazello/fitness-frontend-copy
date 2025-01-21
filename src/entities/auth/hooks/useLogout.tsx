import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@shared/hooks/useAppStore";

import { logOut } from "../model/service/logOut";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (to: string) => {
    void dispatch(logOut()).then(() => {
      navigate(to);
    });
  };
};
