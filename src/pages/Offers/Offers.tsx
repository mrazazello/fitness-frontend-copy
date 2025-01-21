import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { IOfferListItem } from "@entities/offers";
import {
  OffersList,
  fetchOffers,
  getOffersLoading,
  getOffersPagination,
  offersSelectors
} from "@entities/offers";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import useTableFilters from "@shared/hooks/useTableFilters";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { offersRoutesPaths } from "./routesPaths";

const Offers = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { onPageChange } = useTableFilters();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchOffers(Number(searchParams.get("page")) || 1));
  }, [searchParams]);

  const loading = useAppSelector(getOffersLoading);
  const pagination = useAppSelector(getOffersPagination);

  const offers = addReactKeyByProperty<IOfferListItem>(
    useAppSelector(offersSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader
        title={offersRoutesPaths.offers.title}
        extra={
          <Link to={offersRoutesPaths.offer_create.URL()}>
            <Button type="primary">
              {offersRoutesPaths.offer_create.title}
            </Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <OffersList
          offers={offers}
          loading={loading === "loading"}
          onEdit={(code: string) =>
            navigateSave(offersRoutesPaths.offer_edit.URL(code))
          }
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default Offers;
