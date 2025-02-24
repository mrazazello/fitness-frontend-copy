import type {
  IPromocodeListItem,
  IPromocodeDetail,
  IPromocodeEditValues,
  IPromocodeEditRequest
} from "./model/types/promocodes";
import type { IPromocodesSchema } from "./model/slice/promocodesSlice";
import {
  promocodesActions,
  promocodesReducer
} from "./model/slice/promocodesSlice";
import {
  promocodesSelectors,
  getPromocodesLoading,
  getPromocodesDetail,
  getPromocodesPagination
} from "./model/selectors/promocodesSelectors";
import { createPromocode } from "./model/service/createPromocode";
import { deletePromocode } from "./model/service/deletePromocode";
import { editPromocode } from "./model/service/editPromocode";
import { fetchPromocode } from "./model/service/fetchPromocode";
import { fetchPromocodes } from "./model/service/fetchPromocodes";
import { PromocodesList } from "./ui/PromocodesList";
import { PromocodeEditForm } from "./ui/PromocodeEditForm";

export type {
  IPromocodeListItem,
  IPromocodeDetail,
  IPromocodeEditValues,
  IPromocodeEditRequest,
  IPromocodesSchema
};
export { promocodesActions, promocodesReducer };
export {
  promocodesSelectors,
  getPromocodesLoading,
  getPromocodesDetail,
  getPromocodesPagination
};
export {
  createPromocode,
  deletePromocode,
  editPromocode,
  fetchPromocode,
  fetchPromocodes
};
export { PromocodesList, PromocodeEditForm };
