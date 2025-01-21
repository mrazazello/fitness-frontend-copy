import { useAppSelector } from "@shared/hooks/useAppStore";
import { IGroupedOptions } from "@shared/models/filterOptions";

import { getClubAllAreas } from "../model/selectors/clubAreasSelectors";

export const useAreasByClub = () => {
  const areasGoupped = useAppSelector(getClubAllAreas).reduce(
    (acc: IGroupedOptions[], item) => {
      const existingClub = acc.find((club) => club.label === item.club.name);

      if (existingClub) {
        existingClub.options.push({ label: item.name, value: item.code });
      } else {
        acc.push({
          label: item.club.name,
          options: [{ label: item.name, value: item.code }]
        });
      }

      return acc;
    },
    []
  );

  return areasGoupped;
};
