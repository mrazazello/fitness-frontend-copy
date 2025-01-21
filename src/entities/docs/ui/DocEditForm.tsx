import { Checkbox, Form, Input, Select } from "antd";

import { slugRegExp } from "@shared/constants/params";
import TextEditor from "@shared/ui/TextEditor/TextEditor";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import { docsColorOptions } from "../model/constants/docConstants";
import type { IDocDetail, IDocEditValues } from "../model/types/docs";

type TProps = {
  docDetail?: IDocDetail;
  loading?: boolean;
  onSave: (values: IDocEditValues) => void;
  onCancel: () => void;
};

export const DocEditForm = (props: TProps) => {
  const { docDetail, loading = false, onSave, onCancel } = props;

  return (
    <FormWrapper<IDocEditValues>
      loading={loading}
      initialValues={docDetail}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Заголовок"
        name="name"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите заголовок документа"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="slug"
        name="slug"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите slug"
          },
          {
            required: true,
            pattern: new RegExp(slugRegExp),
            message: "Только латинские буквы и цифры"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Цвет"
        name="color"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите цвет ярлыка документа"
          }
        ]}
      >
        <Select options={docsColorOptions} />
      </Form.Item>

      <Form.Item
        label="Показывать на главной?"
        name="mainPageShow"
        valuePropName="checked"
      >
        <Checkbox>Да</Checkbox>
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите описание программы"
          }
        ]}
      >
        <TextEditor value="description" />
      </Form.Item>
    </FormWrapper>
  );
};
