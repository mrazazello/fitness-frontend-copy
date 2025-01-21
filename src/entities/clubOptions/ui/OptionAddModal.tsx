import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

import {
  fetchOptionIcons,
  optionIconsSelectors
} from "@entities/clubOptionsIcons";
import type { IThunkCustomError } from "@shared/api/error";
import { ShowErrorMessages } from "@shared/api/error";
import * as formlabels from "@shared/constants/formsWrappers";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";

// "square" - площадь помещения,
// "child" - детская игровая комната,
// "bar" - фитнес бар
// "cup" - напитки и спортивное питание
// "sun" - вертикальный турбосолярий
// "aqua" - аквазона

interface IAddModalProps {
  isOpen: boolean;
  onOk: (values: { name: string; icon: string }) => void;
  onCancel: () => void;
  messages?: IThunkCustomError[];
}

const OptionAddModal = ({
  isOpen,
  onOk,
  onCancel,
  messages
}: IAddModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchOptionIcons());
  }, []);

  useEffect(() => {
    form.resetFields();
  });

  const icons = useAppSelector(optionIconsSelectors.selectAll).map((item) => {
    return {
      value: item,
      label: item
    };
  });

  return (
    <Modal
      title="Добавление опции"
      open={isOpen}
      onOk={form.submit}
      onCancel={onCancel}
    >
      {messages && <ShowErrorMessages />}
      <Form
        form={form}
        onFinish={onOk}
        labelCol={formlabels.LebelColWide}
        wrapperCol={formlabels.WrapperColWide}
      >
        <Form.Item
          label="Наименование"
          name="name"
          rules={[
            {
              required: true,
              message: "Пожалуйста укажите наименование опции"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Иконка"
          name="icon"
          rules={[
            {
              required: true,
              message: "Пожалуйста выберите опцию"
            }
          ]}
        >
          <Select options={icons} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OptionAddModal;
