import generatePicker from "antd/es/date-picker/generatePicker";
import { PickerProps } from "antd/lib/date-picker/generatePicker";
import { PickerComponentClass } from "antd/lib/date-picker/generatePicker/interface";
import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

// replace Momentjs in DatePicker to Dayjs
// https://4x.ant.design/docs/react/replace-moment
export const AppDatePicker: PickerComponentClass<PickerProps<Dayjs>> =
  generatePicker<Dayjs>(dayjsGenerateConfig);
