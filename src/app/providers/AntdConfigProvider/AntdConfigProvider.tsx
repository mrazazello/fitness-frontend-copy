import { ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import type { ReactElement } from "react";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("ru");

type TProps = {
  children: ReactElement;
};

export const AntdConfigProvider = (props: TProps) => {
  const { children } = props;
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};
