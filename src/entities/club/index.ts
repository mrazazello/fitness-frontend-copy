import {
  IClubAddress,
  IClubListItem,
  IClubDetail,
  IClubEditAddressValues,
  IClubsEditPhotosArgs
} from "./model/types/clubs";
import {
  clubReducer,
  clubActions,
  IClubSchema
} from "./model/slice/clubsSlice";
import {
  clubsSelectors,
  getClubLoading,
  getClubDetail,
  getClubAddress,
  getClubPhotos
} from "./model/selectors/clubSelectors";
import { editAddress } from "./model/service/editAddress";
import { editClub } from "./model/service/editClub";
import { editClubPhotos } from "./model/service/editClubPhotos";
import { fetchClub } from "./model/service/fetchClub";
import { fetchClubAddress } from "./model/service/fetchClubAddress";
import { fetchClubPhotos } from "./model/service/fetchClubPhotos";
import { fetchClubs } from "./model/service/fetchClubs";
import { useClubsSelectItems } from "./hooks/useClubsSelectItems";
import { ClubsList } from "./ui/ClubsList";
import { ClubEditForm } from "./ui/ClubEditForm";
import { ClubAddressEditForm } from "./ui/ClubAddressEditForm";
import { ClubCard } from "./ui/ClubCard";
import { ClubPhotosEditForm } from "./ui/ClubPhotosEditForm";

export type {
  IClubAddress,
  IClubListItem,
  IClubDetail,
  IClubEditAddressValues,
  IClubsEditPhotosArgs,
  IClubSchema
};

export { clubReducer, clubActions };
export {
  clubsSelectors,
  getClubLoading,
  getClubDetail,
  getClubAddress,
  getClubPhotos
};
export {
  editAddress,
  editClub,
  editClubPhotos,
  fetchClub,
  fetchClubAddress,
  fetchClubPhotos,
  fetchClubs
};
export { useClubsSelectItems };
export {
  ClubsList,
  ClubEditForm,
  ClubAddressEditForm,
  ClubCard,
  ClubPhotosEditForm
};
