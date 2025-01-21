import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { IDocEditValues } from "@entities/docs";
import {
  DocEditForm,
  docsActions,
  editDoc,
  fetchDoc,
  getDocDetail,
  getDocsLoading
} from "@entities/docs";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";
import { docsRoutesPaths } from "./routesPaths";

const DocEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(docsActions.resetDocDetail());
    navigateBack(docsRoutesPaths.docs.URL());
  }, []);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) {
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
            ...values,
            code: docDetail.code
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
        title={`${docsRoutesPaths.doc_edit.title}: ${docDetail.name}`}
        onBack={onBack}
      />
      <DocEditForm
        docDetail={docDetail}
        loading={loading === "loading"}
        onSave={handleDocEdit}
        onCancel={onBack}
      />
    </>
  ) : null;
};

export default DocEdit;
