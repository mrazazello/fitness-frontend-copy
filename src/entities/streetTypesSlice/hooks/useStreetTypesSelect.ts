import { useAppSelector } from "@shared/hooks/useAppStore";

import { streetTypesSelectors } from "../model/selectors/streetTypesSelectors";

export const useStreetTypesSelect = () => {
  const streetTypes = useAppSelector(streetTypesSelectors.selectAll);
  const streetTypesSelectOptions = streetTypes.map((item) => ({
    value: item.name,
    label: item.title
  }));

  return streetTypesSelectOptions;
};
