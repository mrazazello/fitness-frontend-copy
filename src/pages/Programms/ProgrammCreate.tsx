import { PageHeader } from "antd";
import { useEffect } from "react";

import type { IProgrammEditValues } from "@entities/programms";
import { ProgramEditForm, createProgramm } from "@entities/programms";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import { programmsRoutesPaths } from "./routesPaths";

const ProgrammCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(programmsRoutesPaths.programms.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleProgrammCreate = (values: IProgrammEditValues) => {
    void dispatch(createProgramm(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  };

  return (
    <>
      <PageHeader
        title={programmsRoutesPaths.programm_create.title}
        onBack={onBack}
      />
      <ProgramEditForm onSave={handleProgrammCreate} onCancel={onBack} />
    </>
  );
};

export default ProgrammCreate;
