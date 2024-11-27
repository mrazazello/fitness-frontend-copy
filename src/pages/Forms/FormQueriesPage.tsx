import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  FormCard,
  fetchformQuerie,
  getFormQueriesDetail,
  getFormQueriesLoading
} from "@entities/formQueries";

import { formsRoutes } from "./Routes";

const FormQueriesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    id && dispatch(fetchformQuerie(id));
  }, [id]);

  const loading = useAppSelector(getFormQueriesLoading);
  const formDetail = useAppSelector(getFormQueriesDetail);

  return (
    <>
      <PageHeader
        title={formsRoutes.form_querie.title}
        onBack={() => navigate(formsRoutes.form_queries.URL())}
      />
      <Card loading={loading === "loading"}>
        <ShowErrorMessages />
        <FormCard formDetail={formDetail} />
      </Card>
    </>
  );
};

export default FormQueriesPage;
