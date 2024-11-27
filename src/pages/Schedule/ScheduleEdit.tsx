import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import getFullName from "@shared/utils/getFullName";
import {
  IScheduleCreateValues,
  IScheduleEditArgs,
  ScheduleEditForm,
  createEvent,
  editEvent,
  fetchEvent,
  getScheduleDetail,
  getScheduleLoading
} from "@entities/schedule";
import { coachsSelectors, fetchCoachs } from "@entities/coachs";
import { fetchProgramms, programmsSelectors } from "@entities/programms";
import { fetchAllAreas, getClubAllAreas } from "@entities/clubAreas";

import PageNotFound from "../404/PageNotFound";

import { scheduleRoutes } from "./Routes";

const ScheduleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchProgramms());
    void dispatch(fetchCoachs());
    void dispatch(fetchAllAreas());
    if (id) void dispatch(fetchEvent(id));
  }, [id]);

  const eventDetail = useAppSelector(getScheduleDetail);
  const loading = useAppSelector(getScheduleLoading);

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

  const clubAllAreas = useAppSelector(getClubAllAreas);
  const areasOptions = clubAllAreas?.map((item) => ({
    value: item.code,
    label: `${item.name} (${item.club.name})`
  }));

  const handleScheduleEdit = (values: IScheduleCreateValues) => {
    const teacher = coachs.find((item) => item.code === values.teacherCode);
    const area = clubAllAreas?.find((item) => item.code === values.areaCode);
    const program = programms.find((item) => item.code === values.programCode);
    if (id && teacher && area && program) {
      const request: IScheduleEditArgs = {
        code: id,
        startedAt: dayjs(values.startedAt).format("YYYY-MM-DD HH:mm:ss"),
        paid: values.paid,
        comment: values.comment,
        teacher,
        area,
        program
      };
      void dispatch(editEvent(request));
    }
  };

  const handleScheduleSaveAs = (values: IScheduleCreateValues) => {
    const teacher = coachs.find((item) => item.code === values.teacherCode);
    const area = clubAllAreas?.find((item) => item.code === values.areaCode);
    const program = programms.find((item) => item.code === values.programCode);
    if (id && teacher && area && program) {
      const request: IScheduleEditArgs = {
        code: id,
        startedAt: dayjs(values.startedAt).format("YYYY-MM-DD HH:mm:ss"),
        paid: values.paid,
        comment: values.comment,
        teacher,
        area,
        program
      };
      void dispatch(createEvent(request));
    }
  };

  if (!id) return <PageNotFound />;

  if (!eventDetail) return null;

  return (
    <>
      <PageHeader
        title={`${scheduleRoutes.schedule_edit.title}: ${dayjs(
          eventDetail.startedAt
        ).format("YYYY-MM-DD HH:mm")}`}
        onBack={() => navigate(scheduleRoutes.schedule.URL())}
      />
      <ScheduleEditForm
        eventDetail={eventDetail}
        loading={loading === "loading"}
        programmsOptions={programmsOptions}
        coachsOptions={coachsOptions}
        areasOptions={areasOptions}
        onSave={handleScheduleEdit}
        onSaveAs={handleScheduleSaveAs}
        onCancel={() => navigate(scheduleRoutes.schedule.URL())}
      />
    </>
  );
};

export default ScheduleEdit;
