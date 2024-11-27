import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import getFullName from "@shared/utils/getFullName";
import {
  IScheduleCreateValues,
  ScheduleEditForm,
  createEvent
} from "@entities/schedule";
import { IScheduleCreateArgs } from "@entities/schedule/model/types/schedule";
import { coachsSelectors, fetchCoachs } from "@entities/coachs";
import { fetchProgramms, programmsSelectors } from "@entities/programms";
import { fetchAllAreas, getClubAllAreas } from "@entities/clubAreas";

import { scheduleRoutes } from "./Routes";

const ScheduleCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  const areasOptions = areas?.map((item) => ({
    value: item.code,
    label: `${item.name} (${item.club.name})`
  }));

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
        if (res.meta.requestStatus === "fulfilled")
          navigate(scheduleRoutes.schedule.URL());
      });
    }
  };

  return (
    <>
      <PageHeader
        title={scheduleRoutes.schedule_create.title}
        onBack={() => navigate(-1)}
      />
      <ScheduleEditForm
        programmsOptions={programmsOptions}
        coachsOptions={coachsOptions}
        areasOptions={areasOptions}
        onSave={handleScheduleCreate}
        onCancel={() => navigate(scheduleRoutes.schedule.URL())}
      />
    </>
  );
};

export default ScheduleCreate;
