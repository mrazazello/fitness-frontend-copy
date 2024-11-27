import { Tooltip } from "antd";
import dayjs from "dayjs";

import { dateFormatDate, dateFormatFull } from "@shared/constants/params";

type PropsType = {
  date: string;
};

const TooltipDate = ({ date }: PropsType) => {
  return (
    <Tooltip title={dayjs(date).format(dateFormatFull)}>
      {dayjs(date).format(dateFormatDate)}
    </Tooltip>
  );
};

export default TooltipDate;
