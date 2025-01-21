import { Form, Input, InputNumber, Select } from "antd";
import { useCallback } from "react";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import type { IOption } from "@shared/models/filterOptions";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import { editAddress } from "../model/service/editAddress";
import type {
  IClubAddress,
  IClubEditAddressValues
} from "../model/types/clubs";

type TProps = {
  clubAddress: IClubAddress;
  loading: boolean;
  clubId: string;
  streetTypes: IOption[];
  onCancel: () => void;
};

export const ClubAddressEditForm = (props: TProps) => {
  const { clubAddress, loading, clubId, streetTypes, onCancel } = props;
  const dispatch = useAppDispatch();

  const handleUpdateClubAddress = useCallback(
    (values: IClubEditAddressValues) => {
      if (clubId) {
        void dispatch(
          editAddress({
            code: clubId,
            ...values
          })
        );
      }
    },
    [clubId]
  );

  return (
    <FormWrapper<IClubEditAddressValues>
      loading={loading}
      initialValues={clubAddress}
      onSave={handleUpdateClubAddress}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Город"
        name="city"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите город клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Тип улицы"
        name="streetType"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите тип улицы клуба"
          }
        ]}
      >
        <Select options={streetTypes} />
      </Form.Item>

      <Form.Item
        label="Наименование улицы"
        name="street"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите наименование улицы клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Дом"
        name="house"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите примечание дом клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Вход"
        name="entrance"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите вход клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Широта"
        name="latitude"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите широту клуба"
          }
        ]}
      >
        <InputNumber controls={false} precision={6} stringMode />
      </Form.Item>

      <Form.Item
        label="Долгота"
        name="longtitude"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите долготу клуба"
          }
        ]}
      >
        <InputNumber controls={false} precision={6} stringMode />
      </Form.Item>
    </FormWrapper>
  );
};
