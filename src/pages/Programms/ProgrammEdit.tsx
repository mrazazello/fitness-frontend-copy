import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { IProgrammEditValues } from "@entities/programms";
import {
  ProgramEditForm,
  editProgramm,
  fetchProgramm,
  getProggramsLoading,
  programmsSelectors
} from "@entities/programms";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";

import { programmsRoutesPaths } from "./routesPaths";

const ProgrammEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(programmsRoutesPaths.programms.URL());

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
        title={`${programmsRoutesPaths.programm_edit.title}: ${programm.name}`}
        onBack={onBack}
      />
      <ProgramEditForm
        programm={programm}
        loading={loading === "loading"}
        onSave={handleProgrammEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default ProgrammEdit;
