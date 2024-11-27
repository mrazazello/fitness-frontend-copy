import {
  store,
  AppStore,
  RootState,
  IThunkConfig,
  useAppDispatch,
  useAppSelector
} from "./providers/StoreProvider/store";
import { StoreProvider } from "./providers/StoreProvider/StoreProvider";
import { AntdConfigProvider } from "./providers/AntdConfigProvider/AntdConfigProvider";
import { RouteProvider } from "./providers/RouteProvider/RouteProvider";

export type { RootState, AppStore, IThunkConfig };
export { useAppDispatch, useAppSelector };
export { store };
export { StoreProvider, AntdConfigProvider, RouteProvider };
