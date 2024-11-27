import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  fetchOffers,
  getOffersLoading,
  getOffersPagination,
  IOfferListItem,
  OffersList,
  offersSelectors
} from "@entities/offers";

import { offersRoutes } from "./Routes";

const Offers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchOffers(1));
  }, []);

  const loading = useAppSelector(getOffersLoading);
  const pagination = useAppSelector(getOffersPagination);

  const offers = addReactKeyByProperty<IOfferListItem>(
    useAppSelector(offersSelectors.selectAll),
    "code"
  );

  const onPageChange = (page: number) => {
    void dispatch(fetchOffers(page));
  };

  return (
    <>
      <PageHeader
        title={offersRoutes.offers.title}
        extra={
          <Link to={offersRoutes.offer_create.URL()}>
            <Button type="primary">{offersRoutes.offer_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <OffersList
          offers={offers}
          loading={loading === "loading"}
          onEdit={(code: string) => navigate(offersRoutes.offer_edit.URL(code))}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default Offers;
