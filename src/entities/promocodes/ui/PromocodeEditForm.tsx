import { Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";

import { promocodeRegExp } from "@shared/constants/params";
import type { IOption } from "@shared/models/filterOptions";
import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import type {
  IPromocodeDetail,
  IPromocodeEditValues
} from "../model/types/promocodes";

type TProps = {
  promocodeDetail?: IPromocodeDetail;
  loading?: boolean;
  allProductsOptions: IOption[];
  onSave: (values: IPromocodeEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const PromocodeEditForm = (props: TProps) => {
  const {
    promocodeDetail,
    loading = false,
    allProductsOptions,
    onSave,
    onCancel
  } = props;

  const initailValue = promocodeDetail && {
    ...promocodeDetail,
    startAt: dayjs(promocodeDetail.startAt, "YYYY-MM-DD"),
    endAt: dayjs(promocodeDetail.endAt, "YYYY-MM-DD")
  };

  return (
    <FormWrapper<IPromocodeEditValues>
      loading={loading}
      initialValues={initailValue}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Активен"
        name="active"
        valuePropName="checked"
        initialValue
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Промокод"
        name="secret"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите промокод"
          },
          {
            required: true,
            pattern: new RegExp(promocodeRegExp),
            message:
              "Допускаются только латинские или русские буквы, цифры и дефис"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Тип скидки"
        name="type"
        rules={[
          {
            required: true,
            message: "Пожалуйста выберите тип скидки"
          }
        ]}
      >
        <Radio.Group value={promocodeDetail?.type}>
          <Radio value="absolute">в рублях</Radio>
          <Radio value="percent">в процентах</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Скидка"
        name="discount"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите скидку в рублях"
          }
        ]}
      >
        <InputNumber precision={2} stringMode />
      </Form.Item>

      <Form.Item
        label="Примечание"
        name="note"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите примечание"
          }
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Действует от"
        name="startAt"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите дату начала"
          }
        ]}
      >
        <AppDatePicker />
      </Form.Item>

      <Form.Item
        label="Действует до"
        name="endAt"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите дату окончания"
          }
        ]}
      >
        <AppDatePicker />
      </Form.Item>

      <Form.Item
        label="Акции"
        name="productCodes"
        rules={[
          {
            required: true,
            message: "Пожалуйста выберите акцию из списка"
          }
        ]}
      >
        <Select
          options={allProductsOptions}
          mode="multiple"
          showSearch
          optionFilterProp="children"
          placeholder="Введите название акции"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </Form.Item>
    </FormWrapper>
  );
};
