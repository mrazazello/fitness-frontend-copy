import {
  IDocsListItem,
  IDocDetail,
  IDocEditValues,
  IDocEditRequest
} from "./model/types/docs";
import { docsActions, docsReducer, IDocsSchema } from "./model/slice/docsSlice";
import { createDoc } from "./model/service/createDoc";
import { deleteDoc } from "./model/service/deleteDoc";
import { editDoc } from "./model/service/editDoc";
import { fetchDoc } from "./model/service/fetchDoc";
import { fetchDocs } from "./model/service/fetchDocs";
import {
  docsSelectors,
  getDocsLoading,
  getDocDetail
} from "./model/selectors/docsSelectors";
import { DocsList } from "./ui/DocsList";
import { DocEditForm } from "./ui/DocEditForm";

export type {
  IDocsListItem,
  IDocDetail,
  IDocEditValues,
  IDocEditRequest,
  IDocsSchema
};
export { docsActions, docsReducer };

export { createDoc, deleteDoc, editDoc, fetchDoc, fetchDocs };
export { docsSelectors, getDocsLoading, getDocDetail };
export { DocsList, DocEditForm };
