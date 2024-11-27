import { Button, Card, Form, Input, Upload } from "antd";
import dayjs from "dayjs";

import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";
import * as form from "@shared/constants/formsWrappers";
import { ShowErrorMessages } from "@shared/api/error";
import { slugRegExp } from "@shared/constants/params";
import { createInitUploadConfig } from "@shared/models/files";
import customUpload, { normFile } from "@shared/utils/customUpload";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";

import { IOfferDetail, IOfferEditValues } from "../model/types/offers";

type TProps = {
  offerDetail?: IOfferDetail;
  loading?: boolean;
  onSave: (values: IOfferEditValues) => void;
  onCancel: () => void;
};

export const OfferEditForm = (props: TProps) => {
  const { offerDetail, loading = false, onSave, onCancel } = props;
  const [editOfferForm] = Form.useForm();

  const initFile = createInitUploadConfig(offerDetail?.photo);
  const initValue = offerDetail && {
    name: offerDetail.name,
    title: offerDetail.title,
    endAt: dayjs(offerDetail.endAt, "YYYY-MM-DD hh:mm:ss"),
    photo: initFile
  };

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editOfferForm"
          labelCol={form.LebelColWide}
          wrapperCol={form.WrapperColWide}
          autoComplete="off"
          disabled={loading}
          initialValues={initValue}
          form={editOfferForm}
          onFinish={onSave}
        >
          <Form.Item
            label="Метка"
            name="name"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите метку спец-предложения"
              },
              {
                required: true,
                pattern: new RegExp(slugRegExp),
                message: "Пожалуйста метку латинскими буквами"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Заголовок"
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите заголовок спец-предложения"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Дата до"
            name="endAt"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите дату завершения"
              }
            ]}
          >
            <AppDatePicker
              showTime={{
                format: "HH:mm"
              }}
            />
          </Form.Item>

          <Form.Item
            label="Фото"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите фото спец-предложения"
              }
            ]}
          >
            <Upload
              accept="image/*"
              customRequest={customUpload}
              listType="picture-card"
              multiple={false}
              maxCount={1}
              defaultFileList={initFile}
            >
              <Button type="link">Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editOfferForm.submit()}
        onCancel={() => onCancel()}
      />
    </>
  );
};