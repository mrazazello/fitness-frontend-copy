import { Card, Input, Checkbox, Form, Select } from "antd";
import dayjs from "dayjs";

import { ShowErrorMessages } from "@shared/api/error";
import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";
import * as form from "@shared/constants/formsWrappers";
import { IOption } from "@shared/models/filterOptions";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import {
  IScheduleCreateValues,
  IScheduleDetail
} from "../model/types/schedule";

type TProps = {
  eventDetail?: IScheduleDetail;
  loading?: boolean;
  programmsOptions: IOption[];
  coachsOptions: IOption[];
  areasOptions: IOption[];
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
  const [editEventForm] = Form.useForm();

  const initailValues = eventDetail && {
    ...eventDetail,
    startedAt: dayjs(eventDetail.startedAt, "YYYY-MM-DD HH:mm")
  };

  const handleSaveAsForm = () => {
    const values = editEventForm.getFieldsValue();
    onSaveAs?.(values);
  };

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editEvent"
          form={editEventForm}
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          onFinish={onSave}
          disabled={loading}
          initialValues={initailValues}
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
            <Select options={programmsOptions} />
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
            <Select options={coachsOptions} />
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

          <Form.Item
            label="Платное участие"
            name="paid"
            valuePropName="checked"
          >
            <Checkbox>Да</Checkbox>
          </Form.Item>

          <Form.Item label="Комментарии" name="comment">
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editEventForm.submit()}
        onSaveAs={onSaveAs ? () => handleSaveAsForm() : undefined}
        onCancel={() => onCancel()}
      />
    </>
  );
};
