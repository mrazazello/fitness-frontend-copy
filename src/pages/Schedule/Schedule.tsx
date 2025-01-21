import { Button, Card, PageHeader } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  ScheduleTableView,
  ScheduleWeekView,
  copyEvents,
  fetchEvents,
  getScheduleLoading,
  scheduleSelectors
} from "@entities/schedule";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { useTableRowSelection } from "@shared/hooks/useTableRowSelection";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { FiltersBlock } from "./FiltersBlock";
import { scheduleRoutesPaths } from "./routesPaths";
import "./schedule.css";

const tabList = [
  {
    key: "WeekView",
    tab: "Календарь"
  },
  {
    key: "TableView",
    tab: "Таблица"
  }
];

const Schedule = () => {
  const dispatch = useAppDispatch();
  const { navigateSave } = useNavigateBack();
  const [searchParams] = useSearchParams();

  const { selectedRowKeys, hasSelected, rowSelection } = useTableRowSelection();

  const [activeTabKey, setActiveTabKey] = useState<string>("WeekView");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  useEffect(() => {
    void dispatch(
      fetchEvents({
        yearAndWeekNumber: searchParams.get("yearAndWeek") || undefined,
        programCode: searchParams.getAll("programm"),
        teacherCode: searchParams.getAll("teacher"),
        areaCode: searchParams.getAll("area"),
        clubCode: searchParams.getAll("club"),
        weekday: searchParams.getAll("weekday")
      })
    );
  }, [searchParams]);

  const loading = useAppSelector(getScheduleLoading);
  const events = addReactKeyByProperty(
    useAppSelector(scheduleSelectors.selectAll),
    "code"
  );

  const handleCopyEvents = () => {
    void dispatch(copyEvents(selectedRowKeys as string[]));
  };

  const tabContentList: Record<string, React.ReactNode> = {
    TableView: (
      <ScheduleTableView
        events={events}
        loading={loading === "loading"}
        rowSelection={rowSelection}
        onEdit={(code: string) =>
          navigateSave(scheduleRoutesPaths.schedule_edit.URL(code))
        }
      />
    ),
    WeekView: (
      <ScheduleWeekView
        events={events}
        loading={loading === "loading"}
        onEdit={(code: string) =>
          navigateSave(scheduleRoutesPaths.schedule_edit.URL(code))
        }
      />
    )
  };

  const handleCreateEvent = () =>
    navigateSave(scheduleRoutesPaths.schedule_create.URL());

  return (
    <>
      <PageHeader
        title="Расписание"
        extra={
          <>
            <Button
              type="primary"
              disabled={!hasSelected}
              onClick={handleCopyEvents}
            >
              Дублировать на неделю
            </Button>
            <Button type="primary" onClick={handleCreateEvent}>
              {scheduleRoutesPaths.schedule_create.title}
            </Button>
          </>
        }
      />
      <Card
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        <ShowErrorMessages />
        <FiltersBlock />
        <br />
        <br />

        {tabContentList[activeTabKey]}
      </Card>
    </>
  );
};

export default Schedule;
