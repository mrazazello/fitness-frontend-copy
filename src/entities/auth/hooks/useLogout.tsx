import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@app/index";
import { logOut } from "@entities/auth";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    void dispatch(logOut());
    navigate("/");
  };
};
