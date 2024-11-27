import { ClockCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

import { useAppDispatch } from "@app/index";
import { IScheduleListItem, deleteEvent } from "@entities/schedule";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import Preloader from "@shared/ui/Preloader/Preloader";
import TableActionsMenu from "@shared/ui/TableActionsMenu/TableActionsMenu";

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
              <Preloader />
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
                  {eventsByTime[time][dayjs(day).format("DD.MM")]?.map((el) => (
                    <div
                      className={`schedule__item ${
                        dayjs(el.startedAt).isBefore(dayjs())
                          ? "row-past-event"
                          : ""
                      }`}
                      key={el.code}
                    >
                      <div className="item-title">
                        {el.paid ? (
                          <DollarCircleOutlined className="item-paid" />
                        ) : null}
                        {el.program.name}
                      </div>
                      <div className="item-teacher">{`${el.teacher.firstName} ${el.teacher.lastName}`}</div>
                      <div className="item-club">
                        {el.area.club.name} ({el.area.name})
                      </div>
                      <TableActionsMenu
                        menu={[
                          {
                            key: el.code,
                            title: "Редактировать",
                            element: (
                              <EditEntityBtn
                                inMenu
                                onEdit={() => onEdit(el.code)}
                              />
                            )
                          },
                          {
                            key: el.code,
                            title: "Удалить",
                            element: (
                              <DeleteEntityBtn
                                inMenu
                                onDelete={() => dispatch(deleteEvent(el.code))}
                              />
                            )
                          }
                        ]}
                        className="item-menu"
                      />
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
