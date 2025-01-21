import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import type { IDocsListItem } from "@entities/docs";
import {
  DocsList,
  docsSelectors,
  fetchDocs,
  getDocsLoading
} from "@entities/docs";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import { docsRoutesPaths } from "./routesPaths";

const Docs = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchDocs());
  }, []);

  const loading = useAppSelector(getDocsLoading);

  const docs = addReactKeyByProperty<IDocsListItem>(
    useAppSelector(docsSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader
        title="Документы"
        extra={
          <Link to={docsRoutesPaths.doc_create.URL()}>
            <Button type="primary">{docsRoutesPaths.doc_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <DocsList
          docs={docs}
          loading={loading === "loading"}
          onEdit={(code: string) =>
            navigateSave(docsRoutesPaths.doc_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Docs;
