import { useStreetTypesSelect } from "./hooks/useStreetTypesSelect";
import { streetTypesSelectors } from "./model/selectors/streetTypesSelectors";
import { fetchstreetTypes } from "./model/service/fetchstreetTypes";
import type { IOptionIconsSchema } from "./model/slice/streetTypesSlice";
import {
  streetTypesActions,
  streetTypesReducer
} from "./model/slice/streetTypesSlice";
import type { IStreetTypeItem } from "./model/types/streetTypes";

export {
  fetchstreetTypes,
  streetTypesActions,
  streetTypesReducer,
  streetTypesSelectors,
  useStreetTypesSelect
};
export type { IOptionIconsSchema, IStreetTypeItem };
