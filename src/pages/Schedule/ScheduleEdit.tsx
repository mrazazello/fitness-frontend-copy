import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  fetchAllAreas,
  getClubAllAreas,
  useAreasByClub
} from "@entities/clubAreas";
import { coachsSelectors, fetchCoachs } from "@entities/coachs";
import { fetchProgramms, programmsSelectors } from "@entities/programms";
import type {
  IScheduleCreateValues,
  IScheduleEditArgs
} from "@entities/schedule";
import {
  ScheduleEditForm,
  createEvent,
  editEvent,
  fetchEvent,
  getScheduleDetail,
  getScheduleLoading,
  scheduleActions
} from "@entities/schedule";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import getFullName from "@shared/utils/getFullName";

import PageNotFound from "../404/PageNotFound";

import { scheduleRoutesPaths } from "./routesPaths";

const ScheduleEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(scheduleActions.resetEventDetail());
    navigateBack(scheduleRoutesPaths.schedule.URL());
  }, []);

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
  const areasOptions = useAreasByClub();

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
        title={`${scheduleRoutesPaths.schedule_edit.title}: ${dayjs(
          eventDetail.startedAt
        ).format("YYYY-MM-DD HH:mm")}`}
        onBack={onBack}
      />
      <ScheduleEditForm
        eventDetail={eventDetail}
        loading={loading === "loading"}
        programmsOptions={programmsOptions}
        coachsOptions={coachsOptions}
        areasOptions={areasOptions}
        onSave={handleScheduleEdit}
        onSaveAs={handleScheduleSaveAs}
        onCancel={onBack}
      />
    </>
  );
};

export default ScheduleEdit;
