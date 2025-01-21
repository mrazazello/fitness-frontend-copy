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

import type { IClubOptionsItem } from "../model/types/clubOptions";

interface IAddModalProps {
  isOpen: boolean;
  onOk: (values: { name: string; icon: string }) => void;
  onCancel: () => void;
  messages?: IThunkCustomError[];
  option: IClubOptionsItem;
}

const OptionEditModal = ({
  isOpen,
  onOk,
  onCancel,
  messages,
  option
}: IAddModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchOptionIcons());
  }, []);

  const icons = useAppSelector(optionIconsSelectors.selectAll).map((item) => {
    return {
      value: item,
      label: item
    };
  });

  return (
    <Modal
      title="Редактирование опции"
      open={isOpen}
      onOk={form.submit}
      onCancel={onCancel}
    >
      {messages && <ShowErrorMessages />}
      <Form
        form={form}
        onFinish={onOk}
        initialValues={{
          name: option.name,
          icon: option.icon
        }}
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

export default OptionEditModal;
