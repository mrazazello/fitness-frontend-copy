import { DollarCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import TableActionsMenu from "@shared/ui/TableActionsMenu/TableActionsMenu";

import type { IScheduleListItem } from "../model/types/schedule";

type TProps = {
  el: IScheduleListItem;
  onEdit: (code: string) => void;
  onDelete: (code: string) => void;
};

export const ScheduleWeekViewItem = (props: TProps) => {
  const { el, onEdit, onDelete } = props;

  return (
    <div
      className={`schedule__item ${
        dayjs(el.startedAt).isBefore(dayjs()) ? "row-past-event" : ""
      }`}
    >
      <div className="item-title">
        {el.paid ? <DollarCircleOutlined className="item-paid" /> : null}
        {el.program.name}
      </div>
      <div className="item-teacher">{`${el.teacher.firstName} ${el.teacher.lastName}`}</div>
      <div className="item-club">
        {el.area.club.name} ({el.area.name})
      </div>
      <TableActionsMenu
        menu={[
          {
            key: "edit",
            title: "Редактировать",
            element: <EditEntityBtn inMenu onEdit={() => onEdit(el.code)} />
          },
          {
            key: "delete",
            title: "Удалить",
            element: (
              <DeleteEntityBtn inMenu onDelete={() => onDelete(el.code)} />
            )
          }
        ]}
        className="item-menu"
      />
    </div>
  );
};
