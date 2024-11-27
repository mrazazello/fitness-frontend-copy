import { Card, Checkbox, Form, Input, InputNumber, Select, Switch } from "antd";

import * as form from "@shared/constants/formsWrappers";
import { ShowErrorMessages } from "@shared/api/error";
import { IOption } from "@shared/models/filterOptions";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import { IProductDetail, IProductEditValues } from "../model/types/products";

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
  const [editProductForm] = Form.useForm();

  const initValue = productDetail && {
    active: productDetail.active,
    title: productDetail.title,
    oldPrice: productDetail.oldPrice,
    price: productDetail.price,
    description: productDetail.description,
    clubCodes: productDetail.clubs.map((club) => club.code),
    promocode: productDetail.promocode
  };

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editProductForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={initValue}
          form={editProductForm}
          onFinish={onSave}
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
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editProductForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};
