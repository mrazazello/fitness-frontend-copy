import type { IOptionIconsSchema } from "@entities/streetTypesSlice";
import { optionIconsSelectors } from "./model/selectors/optionIconsSelectors";
import { fetchOptionIcons } from "./model/service/fetchOptionIcons";
import {
  optionIconsActions,
  optionIconsReducer
} from "./model/slice/optionIconsSlice";

export {
  fetchOptionIcons,
  optionIconsActions,
  optionIconsReducer,
  optionIconsSelectors
};
export type { IOptionIconsSchema };
