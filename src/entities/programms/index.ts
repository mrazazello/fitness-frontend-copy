import type {
  IProgramListItem,
  IProgrammEditValues,
  IProgrammEditRequest
} from "./model/types/programms";
import type { IProgrammsSchema } from "./model/slice/programmsSlice";
import { programmReducer, programmActions } from "./model/slice/programmsSlice";
import {
  programmsSelectors,
  getProggramsLoading
} from "./model/selectors/programmSelectors";
import { createProgramm } from "./model/service/createProgramm";
import { deleteProgramm } from "./model/service/deleteProgramm";
import { editProgramm } from "./model/service/editProgramm";
import { fetchProgramm } from "./model/service/fetchProgramm";
import { fetchProgramms } from "./model/service/fetchProgramms";
import { ProgramsList } from "./ui/ProgramsList";
import { ProgramEditForm } from "./ui/ProgramEditForm";

export type {
  IProgramListItem,
  IProgrammEditValues,
  IProgrammEditRequest,
  IProgrammsSchema
};
export { programmReducer, programmActions };
export { programmsSelectors, getProggramsLoading };
export {
  createProgramm,
  deleteProgramm,
  editProgramm,
  fetchProgramm,
  fetchProgramms
};
export { ProgramsList, ProgramEditForm };
