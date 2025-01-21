import { ShowErrorMessages } from "@shared/api/error";
import { Card, Form } from "antd";
import { ReactNode } from "react";

import * as form from "@shared/constants/formsWrappers";

import { FooterBtnGrp } from "./FooterBtnGrp";

type TProps<Values> = {
  children: ReactNode;
  loading: boolean;
  initialValues: Record<string, any> | undefined;
  onSave: (values: Values) => void;
  onCancel: () => void;
  onSaveAs?: (values: Values) => void;
};

export const FormWrapper = <Values,>(props: TProps<Values>) => {
  const { children, loading, initialValues, onSave, onCancel, onSaveAs } =
    props;

  const [formEntity] = Form.useForm();

  const onSaveAsHandler = () => {
    const values = formEntity.getFieldsValue();
    if (onSaveAs) onSaveAs(values);
  };

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={initialValues}
          form={formEntity}
          onFinish={onSave}
        >
          {children}
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => formEntity.submit()}
        onCancel={onCancel}
        onSaveAs={onSaveAsHandler}
      />
    </>
  );
};
