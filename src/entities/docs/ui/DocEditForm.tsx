import { Card, Checkbox, Form, Input, Select } from "antd";

import { ShowErrorMessages } from "@shared/api/error";
import { slugRegExp } from "@shared/constants/params";
import TextEditor from "@shared/ui/TextEditor/TextEditor";
import * as form from "@shared/constants/formsWrappers";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import { IDocDetail, IDocEditValues } from "../model/types/docs";
import { docsColorOptions } from "../model/constants/docConstants";

type TProps = {
  docDetail?: IDocDetail;
  loading?: boolean;
  onSave: (values: IDocEditValues) => void;
  onCancel: () => void;
};

export const DocEditForm = (props: TProps) => {
  const { docDetail, loading = false, onSave, onCancel } = props;
  const [editDocForm] = Form.useForm();

  const ititValues = docDetail
    ? {
        name: docDetail.name,
        color: docDetail.color,
        mainPageShow: docDetail.mainPageShow,
        description: docDetail.description,
        slug: docDetail.slug
      }
    : undefined;

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editDocForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          onFinish={onSave}
          disabled={loading}
          form={editDocForm}
          initialValues={ititValues}
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
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editDocForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};
