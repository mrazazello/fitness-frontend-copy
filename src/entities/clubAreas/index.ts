import { useAreasByClub } from "./hooks/useAreasByClub";
import {
  getClubAllAreas,
  getClubAreas,
  getClubAreasLoading
} from "./model/selectors/clubAreasSelectors";
import { createClubArea } from "./model/service/createClubArea";
import { deleteArea } from "./model/service/deleteArea";
import { editArea } from "./model/service/editArea";
import { fetchAllAreas } from "./model/service/fetchAllAreas";
import { fetchClubAreas } from "./model/service/fetchClubAreas";
import type { IClubAreasSchema } from "./model/slice/clubAreasSlice";
import {
  clubAreasActions,
  clubAreasReducer
} from "./model/slice/clubAreasSlice";
import type { IClubAreasItem } from "./model/types/clubAreas";
import { ClubAreasList } from "./ui/ClubAreasList";

export {
  ClubAreasList,
  clubAreasActions,
  clubAreasReducer,
  createClubArea,
  deleteArea,
  editArea,
  fetchAllAreas,
  fetchClubAreas,
  getClubAllAreas,
  getClubAreas,
  getClubAreasLoading,
  useAreasByClub
};
export type { IClubAreasItem, IClubAreasSchema };
