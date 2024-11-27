import { Card, PageHeader } from "antd";
import { useEffect } from "react";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  FormsList,
  IFormQueriesListItem,
  fetchformQueries,
  formQueriesSelectors,
  getFormQueriesLoading,
  getFormQueriesPagination
} from "@entities/formQueries";

import { formsRoutes } from "./Routes";

const FormQueries = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchformQueries({ page: 1 }));
  }, []);

  const loading = useAppSelector(getFormQueriesLoading);
  const pagination = useAppSelector(getFormQueriesPagination);

  const forms = addReactKeyByProperty<IFormQueriesListItem>(
    useAppSelector(formQueriesSelectors.selectAll),
    "code"
  );

  const onPageChange = (page: number) => {
    void dispatch(fetchformQueries({ page }));
  };

  return (
    <>
      <PageHeader title={formsRoutes.form_queries.title} />
      <Card>
        <ShowErrorMessages />
        <FormsList
          forms={forms}
          loading={loading === "loading"}
          pagination={pagination}
          onPageChange={onPageChange}
          onView={(code: string) => formsRoutes.form_querie.URL(code)}
        />
      </Card>
    </>
  );
};

export default FormQueries;
