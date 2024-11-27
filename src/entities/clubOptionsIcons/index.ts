import {
  optionIconsReducer,
  optionIconsActions,
  IOptionIconsSchema
} from "./model/slice/optionIconsSlice";
import { optionIconsSelectors } from "./model/selectors/optionIconsSelectors";
import { fetchOptionIcons } from "./model/service/fetchOptionIcons";

export type { IOptionIconsSchema };
export { optionIconsReducer, optionIconsActions, optionIconsSelectors };
export { fetchOptionIcons };
