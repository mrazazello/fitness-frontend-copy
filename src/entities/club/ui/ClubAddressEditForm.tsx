import { Card, Form, Input, InputNumber, Select } from "antd";
import { useCallback } from "react";

import { ShowErrorMessages } from "@shared/api/error";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";
import * as form from "@shared/constants/formsWrappers";
import {
  IClubAddress,
  IClubEditAddressValues,
  editAddress
} from "@entities/club";
import { useAppDispatch } from "@app/index";
import { IOption } from "@shared/models/filterOptions";

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
  const [editClubAddressForm] = Form.useForm();

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
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editClubAddressForm"
          labelCol={form.LebelCol}
          wrapperCol={form.WrapperCol}
          autoComplete="off"
          disabled={loading}
          initialValues={{
            city: clubAddress?.city,
            streetType: clubAddress?.streetType,
            street: clubAddress?.street,
            house: clubAddress?.house,
            entrance: clubAddress?.entrance,
            longtitude: clubAddress?.longtitude,
            latitude: clubAddress?.latitude
          }}
          form={editClubAddressForm}
          onFinish={handleUpdateClubAddress}
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
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editClubAddressForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};
