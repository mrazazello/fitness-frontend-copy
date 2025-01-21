import { Card, PageHeader } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import type { IFormQueriesListItem } from "@entities/formQueries";
import {
  FormsList,
  fetchformQueries,
  formQueriesSelectors,
  getFormQueriesLoading,
  getFormQueriesPagination
} from "@entities/formQueries";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import useTableFilters from "@shared/hooks/useTableFilters";

import { formsRoutesPaths } from "./routesPaths";

const FormQueries = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { onPageChange } = useTableFilters();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(
      fetchformQueries({ page: Number(searchParams.get("page")) || 1 })
    );
  }, [searchParams]);

  const loading = useAppSelector(getFormQueriesLoading);
  const pagination = useAppSelector(getFormQueriesPagination);

  const forms = addReactKeyByProperty<IFormQueriesListItem>(
    useAppSelector(formQueriesSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader title={formsRoutesPaths.form_queries.title} />
      <Card>
        <ShowErrorMessages />
        <FormsList
          forms={forms}
          loading={loading === "loading"}
          pagination={pagination}
          onPageChange={onPageChange}
          onView={(code: string) => formsRoutesPaths.form_querie.URL(code)}
        />
      </Card>
    </>
  );
};

export default FormQueries;
