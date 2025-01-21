import { Checkbox, Form, Input, InputNumber, Select, Switch } from "antd";

import type { IOption } from "@shared/models/filterOptions";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import type {
  IProductDetail,
  IProductEditValues
} from "../model/types/products";

type TProps = {
  productDetail?: IProductDetail;
  loading?: boolean;
  clubsSelectOptions: IOption[];
  onSave: (values: IProductEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ProductEditForm = (props: TProps) => {
  const {
    productDetail,
    loading = false,
    clubsSelectOptions,
    onSave,
    onCancel
  } = props;

  const initValue = productDetail && {
    ...productDetail,
    clubCodes: productDetail.clubs.map((club) => club.code)
  };

  return (
    <FormWrapper<IProductEditValues>
      loading={loading}
      initialValues={initValue}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item label="Активна" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item
        label="Заголовок акции"
        name="title"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите заголовок акции"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Старая цена" name="oldPrice">
        <InputNumber precision={2} stringMode />
      </Form.Item>

      <Form.Item
        label="Цена"
        name="price"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите цену"
          }
        ]}
      >
        <InputNumber precision={2} stringMode />
      </Form.Item>

      <Form.Item
        label="Разрешить промокоды"
        name="promocode"
        valuePropName="checked"
      >
        <Checkbox>Да</Checkbox>
      </Form.Item>

      <Form.Item label="Акция дня" name="dayPromo" valuePropName="checked">
        <Checkbox>Да</Checkbox>
      </Form.Item>

      <Form.Item
        label="Клубы"
        name="clubCodes"
        rules={[
          {
            required: true,
            message: "Пожалуйста выберите клубы"
          }
        ]}
      >
        <Select options={clubsSelectOptions} mode="multiple" />
      </Form.Item>

      <Form.Item
        label="Описание акции"
        name="description"
        tooltip="Переводы строк преобразуются в галочки"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите описание акции"
          }
        ]}
      >
        <TextArea rows={4} showCount maxLength={150} />
      </Form.Item>
    </FormWrapper>
  );
};
