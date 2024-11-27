import {
  IOfferListItem,
  IOfferDetail,
  IOfferEditValues
} from "./model/types/offers";
import {
  offerReducer,
  offerActions,
  IOffersSchema
} from "./model/slice/offersSlice";
import {
  offersSelectors,
  getOfferDetail,
  getOffersLoading,
  getOffersPagination
} from "./model/selectors/offersSelectors";
import { fetchOffer } from "./model/service/fetchOffer";
import { fetchOffers } from "./model/service/fetchOffers";
import { createOffer } from "./model/service/createOffer";
import { deleteOffer } from "./model/service/deleteOffer";
import { editOffer } from "./model/service/editOffer";
import { OffersList } from "./ui/OffersList";
import { OfferEditForm } from "./ui/OfferEditForm";

export type { IOfferListItem, IOfferDetail, IOfferEditValues, IOffersSchema };
export { offerReducer, offerActions };
export {
  offersSelectors,
  getOfferDetail,
  getOffersLoading,
  getOffersPagination
};

export { fetchOffer, fetchOffers, createOffer, deleteOffer, editOffer };
export { OffersList, OfferEditForm };
