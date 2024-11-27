import { Card, Form, Input } from "antd";

import TextEditor from "@shared/ui/TextEditor/TextEditor";
import { emailRegExp } from "@shared/constants/params";
import * as form from "@shared/constants/formsWrappers";
import { ShowErrorMessages } from "@shared/api/error";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import { IClubDetail, IClubEditValues } from "../model/types/clubs";

type TProps = {
  clubDetail?: IClubDetail;
  loading: boolean;
  onSave: (values: IClubEditValues) => void;
  onCancel: () => void;
};

const { TextArea } = Input;

export const ClubEditForm = (props: TProps) => {
  const { clubDetail, loading, onSave, onCancel } = props;
  const [editClubForm] = Form.useForm();

  if (!clubDetail) return null;

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editClub"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={{
            clubName: clubDetail.clubName,
            title: clubDetail.title,
            timetable: clubDetail.timetable,
            timetableNote: clubDetail.timetableNote,
            phone: clubDetail.phone,
            email: clubDetail.email,
            description: clubDetail.description
          }}
          onFinish={onSave}
          form={editClubForm}
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
        </Form>
      </Card>
      <FooterBtnGrp onSave={() => editClubForm.submit()} onCancel={onCancel} />
    </>
  );
};
