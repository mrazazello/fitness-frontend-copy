import { Form, Input } from "antd";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import type { ISliderDetail, ISliderEditValues } from "../model/types/sliders";

type TProps = {
  sliderDetail?: ISliderDetail;
  loading?: boolean;
  onSave: (values: ISliderEditValues) => void;
  onCancel: () => void;
};

export const SliderEditForm = (props: TProps) => {
  const { sliderDetail, loading = false, onSave, onCancel } = props;

  return (
    <FormWrapper<ISliderEditValues>
      loading={loading}
      initialValues={sliderDetail}
      onSave={onSave}
      onCancel={() => onCancel()}
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
    </FormWrapper>
  );
};
