import { RootState } from "@app/index";

import { clubsAdapter } from "../slice/clubsSlice";

export const clubsSelectors = clubsAdapter.getSelectors<RootState>(
  (state: RootState) => state.clubs
);

export const getClubLoading = (state: RootState) => state.clubs.loading;

export const getClubDetail = (state: RootState) => state.clubs.clubDetail;

export const getClubAddress = (state: RootState) => state.clubs.clubAddress;

export const getClubPhotos = (state: RootState) => state.clubs.clubPhotos;
