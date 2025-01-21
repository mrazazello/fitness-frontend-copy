import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { IPromocodeListItem } from "@entities/promocodes";
import {
  PromocodesList,
  fetchPromocodes,
  getPromocodesLoading,
  getPromocodesPagination,
  promocodesSelectors
} from "@entities/promocodes";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import useTableFilters from "@shared/hooks/useTableFilters";

import { promocodesRoutesPaths } from "./routesPaths";

const Promocodes = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const { onPageChange } = useTableFilters();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchPromocodes(Number(searchParams.get("page")) || 1));
  }, [searchParams]);

  const loading = useAppSelector(getPromocodesLoading);
  const promocodes = addReactKeyByProperty<IPromocodeListItem>(
    useAppSelector(promocodesSelectors.selectAll),
    "code"
  );
  const pagination = useAppSelector(getPromocodesPagination);

  return (
    <>
      <PageHeader
        title="Промокоды"
        extra={
          <Link to={promocodesRoutesPaths.promocode_create.URL()}>
            <Button type="primary">
              {promocodesRoutesPaths.promocode_create.title}
            </Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <PromocodesList
          promocodes={promocodes}
          loading={loading === "loading"}
          pagination={pagination}
          onEdit={(code: string) =>
            navigateSave(promocodesRoutesPaths.promocode_edit.URL(code))
          }
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
};

export default Promocodes;
