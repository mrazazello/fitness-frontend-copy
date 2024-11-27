import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import { DocEditForm, IDocEditValues, createDoc } from "@entities/docs";

import { docsRoutes } from "./Routes";

const DocCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleDocCreate = async (values: IDocEditValues) => {
    await dispatch(createDoc(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        navigate(docsRoutes.docs.URL());
    });
  };

  return (
    <>
      <PageHeader
        title={docsRoutes.doc_create.title}
        onBack={() => navigate(-1)}
      />
      <DocEditForm
        onSave={handleDocCreate}
        onCancel={() => navigate(docsRoutes.docs.URL())}
      />
    </>
  );
};

export default DocCreate;
