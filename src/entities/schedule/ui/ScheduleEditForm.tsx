import { Checkbox, Form, Input, Select } from "antd";
import dayjs from "dayjs";

import type { IGroupedOptions, IOption } from "@shared/models/filterOptions";
import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";
import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";

import type {
  IScheduleCreateValues,
  IScheduleDetail
} from "../model/types/schedule";

type TProps = {
  eventDetail?: IScheduleDetail;
  loading?: boolean;
  programmsOptions: IOption[];
  coachsOptions: IOption[];
  areasOptions: IGroupedOptions[];
  onSave: (values: IScheduleCreateValues) => void;
  onSaveAs?: (values: IScheduleCreateValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ScheduleEditForm = (props: TProps) => {
  const {
    eventDetail,
    loading = false,
    programmsOptions,
    coachsOptions,
    areasOptions,
    onSave,
    onSaveAs,
    onCancel
  } = props;

  const initailValues: IScheduleCreateValues | undefined = eventDetail && {
    ...eventDetail,
    startedAt: dayjs(eventDetail.startedAt, "YYYY-MM-DD HH:mm")
  };

  return (
    <FormWrapper<IScheduleCreateValues>
      loading={loading}
      initialValues={initailValues}
      onSave={onSave}
      onCancel={() => onCancel()}
      onSaveAs={onSaveAs ? onSaveAs : undefined}
    >
      <Form.Item
        label="Дата и время начала"
        name="startedAt"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите дату и время начала"
          }
        ]}
      >
        <AppDatePicker
          showTime={{
            format: "HH:mm"
          }}
          format="YYYY-MM-DD HH:mm"
          minuteStep={5}
        />
      </Form.Item>

      <Form.Item
        label="Программа"
        name="programCode"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите программу"
          }
        ]}
      >
        <Select
          options={programmsOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Тренер"
        name="teacherCode"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите количество калорий"
          }
        ]}
      >
        <Select
          options={coachsOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Зал и клуб"
        name="areaCode"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите зал и клуб"
          }
        ]}
      >
        <Select options={areasOptions} />
      </Form.Item>

      <Form.Item label="Платное участие" name="paid" valuePropName="checked">
        <Checkbox>Да</Checkbox>
      </Form.Item>

      <Form.Item label="Комментарии" name="comment">
        <TextArea rows={6} />
      </Form.Item>
    </FormWrapper>
  );
};
