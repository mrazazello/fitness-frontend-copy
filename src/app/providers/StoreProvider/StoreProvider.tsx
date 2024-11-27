import { Provider } from "react-redux";
import { ReactElement } from "react";

import setupAxios from "@shared/api/axios/axios";

import { store } from "./store";

type TProps = {
  children: ReactElement;
};

setupAxios(store);

export const StoreProvider = (props: TProps) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};
