import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import type { IProgramListItem } from "@entities/programms";
import {
  ProgramsList,
  fetchProgramms,
  getProggramsLoading,
  programmsSelectors
} from "@entities/programms";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { programmsRoutesPaths } from "./routesPaths";

const Programms = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchProgramms());
  }, []);

  const loading = useAppSelector(getProggramsLoading);
  const programms = addReactKeyByProperty<IProgramListItem>(
    useAppSelector(programmsSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader
        title={programmsRoutesPaths.programms.title}
        extra={
          <Link to={programmsRoutesPaths.programm_create.URL()}>
            <Button type="primary">
              {programmsRoutesPaths.programm_create.title}
            </Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <ProgramsList
          programms={programms}
          loading={loading === "loading"}
          onEdit={(code: string) =>
            navigateSave(programmsRoutesPaths.programm_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Programms;
