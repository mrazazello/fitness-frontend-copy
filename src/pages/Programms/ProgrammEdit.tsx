import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  IProgrammEditValues,
  ProgramEditForm,
  editProgramm,
  fetchProgramm,
  getProggramsLoading,
  programmsSelectors
} from "@entities/programms";

import PageNotFound from "../404/PageNotFound";

import { programmsRoutes } from "./Routes";

const ProgrammEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchProgramm(id));
  }, [id]);

  const loading = useAppSelector(getProggramsLoading);

  const programm = useAppSelector((state) =>
    id ? programmsSelectors.selectById(state, id) : undefined
  );

  const handleProgrammEdit = useCallback(
    (values: IProgrammEditValues) => {
      if (programm) {
        void dispatch(
          editProgramm({
            ...values,
            code: programm.code
          })
        );
      }
    },
    [programm]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!programm) return null;

  return (
    <>
      <PageHeader
        title={`${programmsRoutes.programm_edit.title}: ${programm.name}`}
        onBack={() => navigate(programmsRoutes.programms.URL())}
      />
      <ProgramEditForm
        programm={programm}
        loading={loading === "loading"}
        onSave={handleProgrammEdit}
        onCancel={() => navigate(programmsRoutes.programms.URL())}
      />
    </>
  );
};

export default ProgrammEdit;
