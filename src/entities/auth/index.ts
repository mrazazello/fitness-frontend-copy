import { useLogout } from "./hooks/useLogout";
import {
  getAccessToken,
  getAuthIsLoading
} from "./model/selectors/authSelectors";
import { logOut } from "./model/service/logOut";
import { login } from "./model/service/login";
import { refreshToken } from "./model/service/refreshToken";
import type { IAuthSchema } from "./model/slice/authSlice";
import { authActions, authReducer } from "./model/slice/authSlice";
import type { ILoginFormValues } from "./model/types/auth";
import { LoginForm } from "./ui/LoginForm";

export {
  LoginForm,
  authActions,
  authReducer,
  getAccessToken,
  getAuthIsLoading,
  logOut,
  login,
  refreshToken,
  useLogout
};
export type { IAuthSchema, ILoginFormValues };
