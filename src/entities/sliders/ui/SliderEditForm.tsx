import { Card, Form, Input } from "antd";

import { ShowErrorMessages } from "@shared/api/error";
import * as form from "@shared/constants/formsWrappers";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import { ISliderDetail, ISliderEditValues } from "../model/types/sliders";

type TProps = {
  sliderDetail?: ISliderDetail;
  loading?: boolean;
  onSave: (values: ISliderEditValues) => void;
  onCancel: () => void;
};

export const SliderEditForm = (props: TProps) => {
  const { sliderDetail, loading = false, onSave, onCancel } = props;
  const [editSliderForm] = Form.useForm();

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editSliderForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={sliderDetail}
          form={editSliderForm}
          onFinish={onSave}
        >
          <Form.Item
            label="Заголовок"
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите заголовок слайдера"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Подзаголовок"
            name="subTitle"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите подзаголовок слайдера"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Название кнопки"
            name="buttonTitle"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите название кнопки"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="URL кнопки"
            extra="Для формы 'отправить заявку' укажите #send-request"
            name="buttonLink"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите URL кнопки"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editSliderForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};
