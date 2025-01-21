import {
  coachsSelectors,
  getCoachDetail,
  getCoachFilters,
  getCoachSorter,
  getCoachsLoading
} from "./model/selectors/coachSelectors";
import { createCoach } from "./model/service/createCoach";
import { deleteCoach } from "./model/service/deleteCoach";
import { editCoach } from "./model/service/editCoach";
import { fetchCoach } from "./model/service/fetchCoach";
import { fetchCoachs } from "./model/service/fetchCoachs";
import type { ICoachsSchema } from "./model/slice/coachsSlice";
import { coachActions, coachReducer } from "./model/slice/coachsSlice";
import type { ICoachDetail, ICoachListItem } from "./model/types/coachs";
import { CoachEditForm } from "./ui/CoachEditForm";
import { CoachList } from "./ui/CoachList";

export {
  CoachEditForm,
  CoachList,
  coachActions,
  coachReducer,
  coachsSelectors,
  createCoach,
  deleteCoach,
  editCoach,
  fetchCoach,
  fetchCoachs,
  getCoachDetail,
  getCoachFilters,
  getCoachSorter,
  getCoachsLoading
};
export type { ICoachDetail, ICoachListItem, ICoachsSchema };
