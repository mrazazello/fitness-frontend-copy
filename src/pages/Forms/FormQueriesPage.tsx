import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  FormCard,
  fetchformQuerie,
  getFormQueriesDetail,
  getFormQueriesLoading
} from "@entities/formQueries";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import { formsRoutesPaths } from "./routesPaths";

const FormQueriesPage = () => {
  const { id } = useParams();
  const { navigateBack } = useNavigateBack();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) dispatch(fetchformQuerie(id));
  }, [id]);

  const loading = useAppSelector(getFormQueriesLoading);
  const formDetail = useAppSelector(getFormQueriesDetail);

  return (
    <>
      <PageHeader
        title={formsRoutesPaths.form_querie.title}
        onBack={() => navigateBack(formsRoutesPaths.form_queries.URL())}
      />
      <Card loading={loading === "loading"}>
        <ShowErrorMessages />
        <FormCard formDetail={formDetail} />
      </Card>
    </>
  );
};

export default FormQueriesPage;
