import { PageHeader } from "antd";
import { useEffect } from "react";

import type { IDocEditValues } from "@entities/docs";
import { DocEditForm, createDoc } from "@entities/docs";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { docsRoutesPaths } from "./routesPaths";

const DocCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(docsRoutesPaths.docs.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleDocCreate = async (values: IDocEditValues) => {
    await dispatch(createDoc(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  };

  return (
    <>
      <PageHeader title={docsRoutesPaths.doc_create.title} onBack={onBack} />
      <DocEditForm onSave={handleDocCreate} onCancel={onBack} />
    </>
  );
};

export default DocCreate;
