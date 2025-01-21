import { Form, Input, InputNumber } from "antd";

import type {
  IProgramListItem,
  IProgrammEditValues
} from "../model/types/programms";
import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";

type TProps = {
  programm?: IProgramListItem;
  loading?: boolean;
  onSave: (values: IProgrammEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ProgramEditForm = (props: TProps) => {
  const { programm, loading = false, onSave, onCancel } = props;

  return (
    <FormWrapper<IProgrammEditValues>
      loading={loading}
      initialValues={programm}
      onSave={onSave}
      onCancel={() => onCancel()}
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
    </FormWrapper>
  );
};
