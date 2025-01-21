import { useAppSelector } from "@shared/hooks/useAppStore";

import { clubsSelectors } from "../model/selectors/clubSelectors";

export const useClubsSelectItems = () => {
  const clubs = useAppSelector(clubsSelectors.selectAll);
  const clubsSelectOptions = clubs.map((item) => ({
    value: item.code,
    label: item.name
  }));

  const clubsFilterOptions = clubs.map((item) => ({
    value: item.code,
    text: item.name
  }));

  return { clubsSelectOptions, clubsFilterOptions };
};
