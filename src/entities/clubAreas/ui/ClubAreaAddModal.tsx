import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

import { ShowErrorMessages } from "@shared/api/error";
import { useAppDispatch } from "@app/index";

import { createClubArea } from "../model/service/createClubArea";

interface IAddModalProps {
  clubId: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ClubAreaAddModal = (props: IAddModalProps) => {
  const { clubId, isOpen, setIsOpen } = props;
  const dispatch = useAppDispatch();
  const [addAreaForm] = Form.useForm();

  useEffect(() => {
    addAreaForm.resetFields();
  }, [isOpen]);

  const handleSubmitAddRoom = (values: { name: string }) => {
    const request = {
      clubCode: clubId,
      name: values.name
    };
    void dispatch(createClubArea(request)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsOpen(false);
      }
    });
  };

  return (
    <Modal
      title="Добавление зала"
      open={isOpen}
      onOk={addAreaForm.submit}
      onCancel={() => setIsOpen(false)}
    >
      <ShowErrorMessages />
      <Form form={addAreaForm} onFinish={handleSubmitAddRoom}>
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

export default ClubAreaAddModal;
