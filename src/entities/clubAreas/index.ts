import { IClubAreasItem } from "./model/types/clubAreas";
import {
  clubAreasActions,
  clubAreasReducer,
  IClubAreasSchema
} from "./model/slice/clubAreasSlice";
import { createClubArea } from "./model/service/createClubArea";
import { deleteArea } from "./model/service/deleteArea";
import { fetchAllAreas } from "./model/service/fetchAllAreas";
import { fetchClubAreas } from "./model/service/fetchClubAreas";
import { editArea } from "./model/service/editArea";
import {
  getClubAreas,
  getClubAllAreas,
  getClubAreasLoading
} from "./model/selectors/clubAreasSelectors";
import { ClubAreasList } from "./ui/ClubAreasList";

export type { IClubAreasItem, IClubAreasSchema };
export { clubAreasActions, clubAreasReducer };
export { createClubArea, deleteArea, fetchAllAreas, fetchClubAreas, editArea };
export { getClubAreas, getClubAllAreas, getClubAreasLoading };
export { ClubAreasList };
