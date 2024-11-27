import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  IPromocodeListItem,
  PromocodesList,
  fetchPromocodes,
  getPromocodesLoading,
  promocodesSelectors
} from "@entities/promocodes";

import { promocodesRoutes } from "./Routes";

const Promocodes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchPromocodes());
  }, []);

  const loading = useAppSelector(getPromocodesLoading);
  const promocodes = addReactKeyByProperty<IPromocodeListItem>(
    useAppSelector(promocodesSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader
        title="Промокоды"
        extra={
          <Link to={promocodesRoutes.promocode_create.URL()}>
            <Button type="primary">
              {promocodesRoutes.promocode_create.title}
            </Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <PromocodesList
          promocodes={promocodes}
          loading={loading === "loading"}
          onEdit={(code: string) =>
            navigate(promocodesRoutes.promocode_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Promocodes;
