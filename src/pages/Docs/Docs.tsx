import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  DocsList,
  IDocsListItem,
  docsSelectors,
  fetchDocs,
  getDocsLoading
} from "@entities/docs";

import { docsRoutes } from "./Routes";

const Docs = () => {
  const navigate = useNavigate();
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
        onBack={() => navigate(-1)}
        extra={
          <Link to={docsRoutes.doc_create.URL()}>
            <Button type="primary">{docsRoutes.doc_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <DocsList
          docs={docs}
          loading={loading === "loading"}
          onEdit={(code: string) => navigate(docsRoutes.doc_edit.URL(code))}
        />
      </Card>
    </>
  );
};

export default Docs;
