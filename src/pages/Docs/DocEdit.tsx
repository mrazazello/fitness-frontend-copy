import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  DocEditForm,
  IDocEditValues,
  docsActions,
  editDoc,
  fetchDoc,
  getDocDetail,
  getDocsLoading
} from "@entities/docs";

import PageNotFound from "../404/PageNotFound";

import { docsRoutes } from "./Routes";

const DocEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) {
      void dispatch(docsActions.resetDocDetail());
      void dispatch(fetchDoc(id));
    }
  }, [id]);

  const docDetail = useAppSelector(getDocDetail);
  const loading = useAppSelector(getDocsLoading);

  const handleDocEdit = useCallback(
    (values: IDocEditValues) => {
      if (docDetail) {
        void dispatch(
          editDoc({
            code: docDetail.code,
            ...values
          })
        );
      }
    },
    [docDetail]
  );

  if (!id || loading === "failed") {
    return <PageNotFound />;
  }

  return docDetail ? (
    <>
      <PageHeader
        title={`${docsRoutes.doc_edit.title}: ${docDetail.name}`}
        onBack={() => navigate(docsRoutes.docs.URL())}
      />
      <DocEditForm
        docDetail={docDetail}
        loading={loading === "loading"}
        onSave={handleDocEdit}
        onCancel={() => navigate(docsRoutes.docs.URL())}
      />
    </>
  ) : null;
};

export default DocEdit;
