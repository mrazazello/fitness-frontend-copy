import { Card, Form, Input, InputNumber } from "antd";

import { ShowErrorMessages } from "@shared/api/error";
import * as form from "@shared/constants/formsWrappers";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import {
  IProgramListItem,
  IProgrammEditValues
} from "../model/types/programms";

type TProps = {
  programm?: IProgramListItem;
  loading?: boolean;
  onSave: (values: IProgrammEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ProgramEditForm = (props: TProps) => {
  const { programm, loading = false, onSave, onCancel } = props;
  const [editProgramForm] = Form.useForm();

  const initValue = programm && {
    name: programm.name,
    description: programm.description,
    duration: programm.duration,
    calories: programm.calories
  };

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editProgramForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={initValue}
          form={editProgramForm}
          onFinish={onSave}
        >
          <Form.Item
            label="Название программы"
            name="name"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите название программы"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Продолжительность, мин"
            name="duration"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите продолжительность программы"
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Калорий"
            name="calories"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите количество калорий"
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Краткое описание"
            name="description"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите краткое описание"
              }
            ]}
          >
            <TextArea rows={4} showCount maxLength={100} />
          </Form.Item>
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editProgramForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};
