import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import Preloader from "@shared/ui/Preloader/Preloader";

import { deleteEvent } from "../model/service/deleteEvent";
import type { IScheduleListItem } from "../model/types/schedule";

import { ScheduleWeekViewItem } from "./ScheduleWeekViewItem";

const getWeekRangeByDate = (firstDate: string): Dayjs[] => {
  if (!firstDate) return [];
  const firstDayOfWeek = dayjs(firstDate).startOf("week");
  const range = new Array(7).fill("");
  return range.reduce((acc, _item, index) => {
    return [...acc, firstDayOfWeek.add(index, "day").locale("ru")];
  }, []);
};

const mapEventsByTime = (events: IScheduleListItem[]) =>
  events.reduce<Record<string, Record<string, IScheduleListItem[]>>>(
    (acc, item) => {
      const time = dayjs(item.startedAt).format("HH:mm");
      const day = dayjs(item.startedAt).format("DD.MM");
      const newAcc = { ...acc };

      if (time in newAcc) {
        if (day in newAcc[time]) {
          newAcc[time][day].push(item);
        } else {
          newAcc[time][day] = [item];
        }
      } else {
        newAcc[time] = { [day]: [item] };
      }

      return newAcc;
    },
    {}
  );

type TProps = {
  events: IScheduleListItem[];
  loading: boolean;
  onEdit: (code: string) => void;
};

export const ScheduleWeekView = (props: TProps) => {
  const { events, loading, onEdit } = props;
  const dispatch = useAppDispatch();

  const weekRange = getWeekRangeByDate(events[0]?.startedAt);
  const eventsByTime = mapEventsByTime(events);

  return (
    <>
      <table className="schedule">
        <thead>
          <tr>
            <th>
              <ClockCircleOutlined />
            </th>
            {weekRange.map((day) => (
              <th key={day.format("DD.MM")}>
                {day.isSame(dayjs(), "day") ? (
                  <strong>
                    <div>{day.format("DD.MM")}</div>
                    <div>{day.format("dddd")}</div>
                  </strong>
                ) : (
                  <>
                    <div>{day.format("DD.MM")}</div>
                    <div>{day.format("dddd")}</div>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={8}>
                <Preloader message="Loading schedule" />
              </td>
            </tr>
          )}
          {Object.keys(eventsByTime)
            .sort((a, b) => a.localeCompare(b))
            .map((time) => (
              <tr key={time} className={time}>
                <td className="app__time">{time}</td>
                {weekRange.map((day) => (
                  <td key={dayjs(day).format("DD.MM")}>
                    {eventsByTime[time][dayjs(day).format("DD.MM")]?.map(
                      (el) => (
                        <ScheduleWeekViewItem
                          key={el.code}
                          el={el}
                          onEdit={onEdit}
                          onDelete={() => dispatch(deleteEvent(el.code))}
                        />
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
