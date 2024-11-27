import React from "react";
import ReactDOM from "react-dom/client";

import { AntdConfigProvider, RouteProvider, StoreProvider } from "@app/index";

import "./index.css";

// replace console.* for disable log on production
if (import.meta.env.PROD) {
  console.log = () => {}; // eslint-disable-line no-empty-function
  console.error = () => {}; // eslint-disable-line no-empty-function
  console.debug = () => {}; // eslint-disable-line no-empty-function
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <AntdConfigProvider>
        <RouteProvider />
      </AntdConfigProvider>
    </StoreProvider>
  </React.StrictMode>
);
