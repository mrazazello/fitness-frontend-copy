import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

import { ShowErrorMessages } from "@shared/api/error";
import { useAppDispatch } from "@app/index";

import { IClubAreasItem } from "../model/types/clubAreas";
import { editArea } from "../model/service/editArea";

interface IAddModalProps {
  isEditRoom: IClubAreasItem | null;
  setIsEditRoom: (value: IClubAreasItem | null) => void;
}

const ClubAreaEditModal = (props: IAddModalProps) => {
  const { isEditRoom, setIsEditRoom } = props;
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (isEditRoom) {
      form.setFieldsValue({
        name: isEditRoom.name
      });
    }
  }, [isEditRoom]);

  const handleSubmitEditRoom = (values: { name: string }) => {
    if (isEditRoom) {
      const request = {
        code: isEditRoom?.code,
        name: values.name
      };
      void dispatch(editArea(request)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsEditRoom(null);
        }
      });
    }
  };

  if (!isEditRoom) return null;

  return (
    <Modal
      title="Редактирование зала"
      open={Boolean(isEditRoom.code)}
      onOk={form.submit}
      onCancel={() => setIsEditRoom(null)}
    >
      <ShowErrorMessages />
      <Form form={form} onFinish={handleSubmitEditRoom}>
        <Form.Item
          label="Наименование зала"
          name="name"
          rules={[
            {
              required: true,
              message: "Пожалуйста укажите наименование зала"
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClubAreaEditModal;
