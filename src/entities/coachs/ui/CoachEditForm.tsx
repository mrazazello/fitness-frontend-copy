import { Button, Checkbox, Form, Input, Radio, Select, Upload } from "antd";

import type {
  ICoachDetail,
  ICoachsEditValues
} from "@entities/coachs/model/types/coachs";
import { coachTypes } from "@entities/coachs/model/types/coachs";
import { phoneRegExp } from "@shared/constants/params";
import { createInitUploadConfig } from "@shared/models/files";
import type { IOption } from "@shared/models/filterOptions";
import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import TextEditor from "@shared/ui/TextEditor/TextEditor";
import customUpload, { normFile } from "@shared/utils/customUpload";

const { TextArea } = Input;

type TProps = {
  coachDetail?: ICoachDetail;
  loading?: boolean;
  onSave: (values: ICoachsEditValues) => void;
  onCancel: () => void;
  clubsSelectOptions: IOption[];
};

export const CoachEditForm = (props: TProps) => {
  const {
    coachDetail,
    loading = false,
    clubsSelectOptions,
    onSave,
    onCancel
  } = props;

  const initFile = createInitUploadConfig(coachDetail?.photo);

  const initValues = coachDetail && {
    ...coachDetail,
    photo: initFile,
    hideLastName: coachDetail.hideLastName
  };

  return (
    <FormWrapper<ICoachsEditValues>
      loading={loading}
      initialValues={initValues}
      onSave={onSave}
      onCancel={() => onCancel()}
    >
      <Form.Item
        label="Имя тренера"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите имя тренера"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия тренера"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите фамилию тренера"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Скрывать фамилию на сайте"
        name="hideLastName"
        valuePropName="checked"
      >
        <Checkbox>Да</Checkbox>
      </Form.Item>

      <Form.Item
        label="Тип тренера"
        name="jobType"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите тип работы тренера"
          }
        ]}
      >
        <Radio.Group options={coachTypes} />
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phone"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите телефон тренера"
          },
          {
            required: true,
            pattern: new RegExp(phoneRegExp),
            message: "Пожалуйста введите корректный телефон"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Имя пользователя телеграмм" name="socialTG">
        <Input />
      </Form.Item>

      <Form.Item label="Имя пользователя вконтакте" name="socialVK">
        <Input />
      </Form.Item>

      <Form.Item label="Клубы тренера" name="clubCodes">
        <Select options={clubsSelectOptions} mode="multiple" allowClear />
      </Form.Item>

      <Form.Item
        label="Краткое описание"
        name="shortBio"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите краткое описание тренера"
          }
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите описание тренера"
          }
        ]}
      >
        <TextEditor value="description" />
      </Form.Item>

      <Form.Item
        label="Фото тренера"
        name="photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Пожалуйста укажите фото тренера"
          }
        ]}
      >
        <Upload
          accept="image/*"
          customRequest={customUpload}
          listType="picture-card"
          multiple={false}
          maxCount={1}
        >
          <Button type="link">Загрузить</Button>
        </Upload>
      </Form.Item>
    </FormWrapper>
  );
};
