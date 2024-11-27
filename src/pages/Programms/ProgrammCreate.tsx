import { PageHeader } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import {
  IProgrammEditValues,
  ProgramEditForm,
  createProgramm
} from "@entities/programms";

import { programmsRoutes } from "./Routes";

const ProgrammCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleProgrammCreate = (values: IProgrammEditValues) => {
    void dispatch(createProgramm(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        navigate(programmsRoutes.programms.URL());
    });
  };

  return (
    <>
      <PageHeader
        title={programmsRoutes.programm_create.title}
        onBack={() => () => navigate(programmsRoutes.programms.URL())}
      />
      <ProgramEditForm
        onSave={handleProgrammCreate}
        onCancel={() => navigate(programmsRoutes.programms.URL())}
      />
    </>
  );
};

export default ProgrammCreate;
