import { ConfigProvider } from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { ReactElement } from "react";

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
