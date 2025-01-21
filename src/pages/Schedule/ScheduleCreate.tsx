import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import {
  fetchAllAreas,
  getClubAllAreas,
  useAreasByClub
} from "@entities/clubAreas";
import { coachsSelectors, fetchCoachs } from "@entities/coachs";
import { fetchProgramms, programmsSelectors } from "@entities/programms";
import type { IScheduleCreateValues } from "@entities/schedule";
import { ScheduleEditForm, createEvent } from "@entities/schedule";
import type { IScheduleCreateArgs } from "@entities/schedule/model/types/schedule";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import getFullName from "@shared/utils/getFullName";

import { scheduleRoutesPaths } from "./routesPaths";

const ScheduleCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(scheduleRoutesPaths.schedule.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchProgramms());
    void dispatch(fetchCoachs());
    void dispatch(fetchAllAreas());
  }, []);

  const programms = useAppSelector(programmsSelectors.selectAll);
  const programmsOptions = programms.map((item) => ({
    value: item.code,
    label: item.name
  }));

  const coachs = useAppSelector(coachsSelectors.selectAll);
  const coachsOptions = coachs.map((item) => ({
    value: item.code,
    label: getFullName(item.firstName, item.lastName)
  }));

  const areas = useAppSelector(getClubAllAreas);
  const areasOptions = useAreasByClub();

  const handleScheduleCreate = (values: IScheduleCreateValues) => {
    const teacher = coachs.find((item) => item.code === values.teacherCode);
    const area = areas?.find((item) => item.code === values.areaCode);
    const program = programms.find((item) => item.code === values.programCode);
    if (teacher && area && program) {
      const request: IScheduleCreateArgs = {
        startedAt: dayjs(values.startedAt).format("YYYY-MM-DD HH:mm:ss"),
        paid: values.paid,
        comment: values.comment,
        teacher,
        area,
        program
      };
      void dispatch(createEvent(request)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") onBack();
      });
    }
  };

  return (
    <>
      <PageHeader
        title={scheduleRoutesPaths.schedule_create.title}
        onBack={onBack}
      />
      <ScheduleEditForm
        programmsOptions={programmsOptions}
        coachsOptions={coachsOptions}
        areasOptions={areasOptions}
        onSave={handleScheduleCreate}
        onCancel={onBack}
      />
    </>
  );
};

export default ScheduleCreate;
