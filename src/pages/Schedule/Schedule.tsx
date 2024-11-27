import { Button, Card, PageHeader } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  copyEvents,
  fetchEvents,
  getScheduleLoading,
  scheduleActions,
  scheduleSelectors,
  ScheduleTableView,
  ScheduleWeekView
} from "@entities/schedule";
import { useTableRowSelection } from "@shared/hooks/useTableRowSelection";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import "./schedule.css";

import { FiltersBlock } from "./FiltersBlock";
import { scheduleRoutes } from "./Routes";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const { selectedRowKeys, hasSelected, rowSelection } = useTableRowSelection();

  const [activeTabKey, setActiveTabKey] = useState<string>("WeekView");
  const onTabChange = (key: string) => setActiveTabKey(key);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(scheduleActions.resetEventDetail());
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
          navigate(scheduleRoutes.schedule_edit.URL(code))
        }
      />
    ),
    WeekView: (
      <ScheduleWeekView
        events={events}
        loading={loading === "loading"}
        onEdit={(code: string) =>
          navigate(scheduleRoutes.schedule_edit.URL(code))
        }
      />
    )
  };

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
            <Link to={scheduleRoutes.schedule_create.URL()}>
              <Button type="primary">
                {scheduleRoutes.schedule_create.title}
              </Button>
            </Link>
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
