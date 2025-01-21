import { Form, Input } from "antd";

import { emailRegExp } from "@shared/constants/params";
import TextEditor from "@shared/ui/TextEditor/TextEditor";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import type { IClubDetail, IClubEditValues } from "../model/types/clubs";

type TProps = {
  clubDetail?: IClubDetail;
  loading: boolean;
  onSave: (values: IClubEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ClubEditForm = (props: TProps) => {
  const { clubDetail, loading, onSave, onCancel } = props;

  if (!clubDetail) return null;

  return (
    <FormWrapper<IClubEditValues>
      loading={loading}
      initialValues={clubDetail}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Наименование клуба"
        name="clubName"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите наименование клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите title клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Режим работы"
        name="timetable"
        tooltip="Учитываются переводы строк"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите режим работы клуба"
          }
        ]}
      >
        <TextArea rows={7} />
      </Form.Item>

      <Form.Item
        label="Примечание к режиму работы"
        name="timetableNote"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите примечание к режиму работы клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phone"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите телефон клуба"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email для уведомлений"
        name="email"
        rules={[
          {
            required: true,
            message:
              "Пожалуйста укажите email для получения уведомлений по заказам на этот клуб"
          },
          {
            required: true,
            pattern: new RegExp(emailRegExp),
            message: "Пожалуйста укажите валидный email"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите описание клуба"
          }
        ]}
      >
        <TextEditor value="description" />
      </Form.Item>
    </FormWrapper>
  );
};
