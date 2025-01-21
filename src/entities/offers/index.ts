import {
  getOfferDetail,
  getOffersLoading,
  getOffersPagination,
  offersSelectors
} from "./model/selectors/offersSelectors";
import { createOffer } from "./model/service/createOffer";
import { deleteOffer } from "./model/service/deleteOffer";
import { editOffer } from "./model/service/editOffer";
import { fetchOffer } from "./model/service/fetchOffer";
import { fetchOffers } from "./model/service/fetchOffers";
import type { IOffersSchema } from "./model/slice/offersSlice";
import { offerActions, offerReducer } from "./model/slice/offersSlice";
import type {
  IOfferDetail,
  IOfferEditValues,
  IOfferListItem
} from "./model/types/offers";
import { OfferEditForm } from "./ui/OfferEditForm";
import { OffersList } from "./ui/OffersList";

export {
  getOfferDetail,
  getOffersLoading,
  getOffersPagination,
  offerActions,
  offerReducer,
  offersSelectors
};
export type { IOfferDetail, IOfferEditValues, IOfferListItem, IOffersSchema };

export {
  OfferEditForm,
  OffersList,
  createOffer,
  deleteOffer,
  editOffer,
  fetchOffer,
  fetchOffers
};
