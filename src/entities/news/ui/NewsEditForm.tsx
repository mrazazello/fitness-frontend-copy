import { Button, Form, Input, Upload } from "antd";
import dayjs from "dayjs";

import { AppDatePicker } from "@shared/ui/AppDatePicker/AppDatePicker";
import TextEditor from "@shared/ui/TextEditor/TextEditor";
import { createInitUploadConfig } from "@shared/models/files";
import customUpload, { normFile } from "@shared/utils/customUpload";

import type { INewsDetail, INewsEditValues } from "../model/types/news";
import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";

type TProps = {
  newsDetail?: INewsDetail;
  loading?: boolean;
  onSave: (values: INewsEditValues) => void;
  onCancel: () => void;
};

export const NewsEditForm = (props: TProps) => {
  const { newsDetail, loading = false, onSave, onCancel } = props;

  const initFile = createInitUploadConfig(newsDetail?.photo);

  const initValues = newsDetail && {
    title: newsDetail.title,
    date: dayjs(newsDetail.date, "YYYY-MM-DD hh:mm:ss"),
    content: newsDetail.content,
    photo: initFile
  };

  return (
    <FormWrapper<INewsEditValues>
      loading={loading}
      initialValues={initValues}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Заголовок новости"
        name="title"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите заголовок новости"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Дата и время"
        name="date"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите дату и время новости"
          }
        ]}
      >
        <AppDatePicker
          showTime={{
            format: "HH:mm"
          }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>

      <Form.Item
        label="Текст новости"
        name="content"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите текст новости"
          }
        ]}
      >
        <TextEditor value="content" placeholder="Текст новости" />
      </Form.Item>

      <Form.Item
        label="Фото новости"
        name="photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите фото новости"
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
    </FormWrapper>
  );
};
