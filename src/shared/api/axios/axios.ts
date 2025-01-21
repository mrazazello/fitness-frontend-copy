import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { AppStore } from "@app/providers/StoreProvider/store";
import { refreshToken } from "@entities/auth/model/service/refreshToken";
import type { IThunkCustomError } from "@shared/api/error/model/types/error";
import { envConfig } from "@shared/config/env";

const contentType = "application/json";

// type guard function for unknow type from redux thunk Payload action
const hasError = (obj: unknown): obj is PayloadAction<IThunkCustomError> => {
  return typeof obj === "object" && obj !== null && "error" in obj;
};

const setupAxios = (store: AppStore) => {
  axios.defaults.baseURL = envConfig.BACKEND_API_URL;
  axios.defaults.headers.common.Accept = contentType;
  axios.defaults.headers.post["Content-Type"] = contentType;

  axios.interceptors.request.use(
    (request) => {
      const { accessToken } = store.getState().auth;
      if (accessToken && request.headers) {
        // eslint-disable-next-line no-param-reassign
        request.headers.Authorization = `Bearer ${accessToken}`; // eslint-disable-line no-param-reassign
        return request;
      }
      return request;
    },
    (error) => {
      // Promise.reject() is not supported in IE 11
      /* eslint-disable-next-line */
      Promise.reject(error);
    }
  );

  type ISubscriber = () => void;

  let isAlreadyFetchingAccessToken = false;
  let subscribers: ISubscriber[] = [];

  const onAccessTokenFetched = () => {
    subscribers.forEach((callback) => callback());
    subscribers = [];
  };

  const addSubscriber = (callback: ISubscriber) => {
    subscribers.push(callback);
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const { config } = error;
      const originalRequest = config;
      const status = error.response?.status;

      if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          store.dispatch(refreshToken()).then((action) => {
            isAlreadyFetchingAccessToken = false;
            if (hasError(action)) {
              console.log("has error: ", action);
            } else {
              onAccessTokenFetched();
            }
            // мы попадаем сюда всегда, даже если refresh вызывается с ошибкой
          });
        }

        return new Promise((resolve) => {
          addSubscriber(
            () => originalRequest && resolve(axios(originalRequest))
          );
        });
      }
      // Promise.reject() is not supported in IE 11
      /* eslint-disable-next-line */
      return Promise.reject(error);
    }
  );
};

export default setupAxios;
