import { ICoachListItem, ICoachDetail } from "./model/types/coachs";
import {
  coachActions,
  coachReducer,
  ICoachsSchema
} from "./model/slice/coachsSlice";
import { fetchCoachs } from "./model/service/fetchCoachs";
import { createCoach } from "./model/service/createCoach";
import { deleteCoach } from "./model/service/deleteCoach";
import { fetchCoach } from "./model/service/fetchCoach";
import { editCoach } from "./model/service/editCoach";
import {
  coachsSelectors,
  getCoachsLoading,
  getCoachDetail,
  getCoachFilters,
  getCoachSorter
} from "./model/selectors/coachSelectors";
import { CoachEditForm } from "./ui/CoachEditForm";
import { CoachList } from "./ui/CoachList";

export type { ICoachListItem, ICoachDetail, ICoachsSchema };
export { coachActions, coachReducer };
export { fetchCoachs, createCoach, deleteCoach, fetchCoach, editCoach };
export {
  coachsSelectors,
  getCoachsLoading,
  getCoachDetail,
  getCoachFilters,
  getCoachSorter
};
export { CoachEditForm, CoachList };
