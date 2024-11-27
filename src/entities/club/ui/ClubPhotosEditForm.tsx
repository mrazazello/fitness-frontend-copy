import { Button, Card, Form, Upload } from "antd";
import { useCallback } from "react";

import { ShowErrorMessages } from "@shared/api/error";
import { FooterBtnGrp } from "@shared/ui/FooterBtnGrp/FooterBtnGrp";
import * as form from "@shared/constants/formsWrappers";
import { IPhotoListItem } from "@shared/models/photo";
import {
  convertIFileResponseToPhotoListItems,
  createInitUploadConfig
} from "@shared/models/files";
import customUpload, { normFile } from "@shared/utils/customUpload";
import { useAppDispatch } from "@app/index";

import { IClubEditPhotosValues } from "../model/types/clubs";
import { editClubPhotos } from "../model/service/editClubPhotos";

type TProps = {
  clubId: string;
  loading: boolean;
  clubPhotos?: IPhotoListItem[];
  onCancel: () => void;
};

export const ClubPhotosEditForm = (props: TProps) => {
  const { clubId, loading, clubPhotos, onCancel } = props;
  const dispatch = useAppDispatch();
  const [editClubPhotosForm] = Form.useForm();

  const initFile = createInitUploadConfig(clubPhotos);

  const handleUpdateClubAddress = useCallback(
    (values: IClubEditPhotosValues) => {
      if (!values.photo || !Array.isArray(values.photo)) return;

      void dispatch(
        editClubPhotos({
          code: clubId,
          photos: convertIFileResponseToPhotoListItems(values.photo)
        })
      );
    },
    [clubId]
  );

  return (
    <>
      <Card>
        <ShowErrorMessages />
        <Form
          name="editClubPhotos"
          labelCol={form.LebelCol}
          wrapperCol={form.WrapperCol}
          autoComplete="off"
          disabled={loading}
          initialValues={{
            photo: initFile
          }}
          form={editClubPhotosForm}
          onFinish={handleUpdateClubAddress}
        >
          <Form.Item
            label="Фотографии клуба"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите фото клуба"
              }
            ]}
          >
            <Upload
              accept="image/*"
              customRequest={customUpload}
              listType="picture-card"
              multiple
              maxCount={10}
              //   defaultFileList={initFile}
            >
              <Button type="link">Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Card>
      <FooterBtnGrp
        onSave={() => editClubPhotosForm.submit()}
        onCancel={onCancel}
      />
    </>
  );
};
