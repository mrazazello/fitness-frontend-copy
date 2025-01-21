import type { RootState } from "@app/index";

export const getClubAreas = (state: RootState) => state.clubAreas.clubAreas;

export const getClubAllAreas = (state: RootState) =>
  state.clubAreas.clubAllAreas;

export const getClubAreasLoading = (state: RootState) =>
  state.clubAreas.loading;
