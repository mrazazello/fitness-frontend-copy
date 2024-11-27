import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  fetchProgramms,
  getProggramsLoading,
  IProgramListItem,
  programmsSelectors,
  ProgramsList
} from "@entities/programms";

import { programmsRoutes } from "./Routes";

const Programms = () => {
  const navigate = useNavigate();
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
        title={programmsRoutes.programms.title}
        extra={
          <Link to={programmsRoutes.programm_create.URL()}>
            <Button type="primary">
              {programmsRoutes.programm_create.title}
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
            navigate(programmsRoutes.programm_edit.URL(code))
          }
        />
      </Card>
    </>
  );
};

export default Programms;
