import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore
} from "react-redux";

import { scheduleReducer } from "@entities/schedule";
import { coachReducer } from "@entities/coachs";
import { docsReducer } from "@entities/docs";
import { clubReducer } from "@entities/club";
import { offerReducer } from "@entities/offers";
import { newsReducer } from "@entities/news";
import { formQuerieReducer } from "@entities/formQueries";
import { orderReducer } from "@entities/orders";
import { productReducer } from "@entities/products";
import { sliderReducer } from "@entities/sliders";
import { optionIconsReducer } from "@entities/clubOptionsIcons";
import { programmReducer } from "@entities/programms";
import { promocodesReducer } from "@entities/promocodes";
import { streetTypesReducer } from "@entities/streetTypesSlice";
import { authReducer } from "@entities/auth";
import { errorReducer } from "@shared/api/error";
import { IThunkCustomError } from "@shared/api/error/model/types/error";
import { clubOptionsReducer } from "@entities/clubOptions";
import { clubAreasReducer } from "@entities/clubAreas";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    clubs: clubReducer,
    clubOptions: clubOptionsReducer,
    clubAreas: clubAreasReducer,
    optionIcons: optionIconsReducer,
    streetTypes: streetTypesReducer,
    coachs: coachReducer,
    programms: programmReducer,
    schedule: scheduleReducer,
    docs: docsReducer,
    news: newsReducer,
    products: productReducer,
    promocodes: promocodesReducer,
    offers: offerReducer,
    orders: orderReducer,
    formQueries: formQuerieReducer,
    sliders: sliderReducer
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export interface IThunkConfig {
  rejectValue: IThunkCustomError;
  state: RootState;
}
