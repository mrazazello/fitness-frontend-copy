import { Button, Form, Upload } from "antd";
import { useCallback } from "react";

import { useAppDispatch } from "@shared/hooks/useAppStore";
import {
  convertIFileResponseToPhotoListItems,
  createInitUploadConfig
} from "@shared/models/files";
import type { IPhotoListItem } from "@shared/models/photo";
import customUpload, { normFile } from "@shared/utils/customUpload";

import { FormWrapper } from "@shared/ui/FormWrapper/FormWrapper";
import { editClubPhotos } from "../model/service/editClubPhotos";
import type { IClubEditPhotosValues } from "../model/types/clubs";

type TProps = {
  clubId: string;
  loading: boolean;
  clubPhotos?: IPhotoListItem[];
  onCancel: () => void;
};

export const ClubPhotosEditForm = (props: TProps) => {
  const { clubId, loading, clubPhotos, onCancel } = props;
  const dispatch = useAppDispatch();

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
    <FormWrapper<IClubEditPhotosValues>
      loading={loading}
      initialValues={{
        photo: initFile
      }}
      onSave={handleUpdateClubAddress}
      onCancel={() => onCancel()}
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
    </FormWrapper>
  );
};
