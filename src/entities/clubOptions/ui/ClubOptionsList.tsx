import { Button, Card, Space, Table, Typography } from "antd";
import type { ColumnProps } from "antd/lib/table";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import {
  getClubOptions,
  getClubOptionsLoading
} from "../model/selectors/clubOptionSelectors";
import { createClubOption } from "../model/service/createClubOption";
import { deleteOption } from "../model/service/deleteOption";
import { editOption } from "../model/service/editOption";
import { fetchClubOptions } from "../model/service/fetchClubOptions";
import type { IClubOptionsItem } from "../model/types/clubOptions";

import OptionAddModal from "./OptionAddModal";
import OptionEditModal from "./OptionEditModal";

type TProps = {
  clubId: string;
};

const { Title } = Typography;

export const ClubOptionList = (props: TProps) => {
  const { clubId } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (clubId) {
      void dispatch(fetchClubOptions(clubId));
    }
  }, []);

  const clubOptions = useAppSelector(getClubOptions);
  const loading = useAppSelector(getClubOptionsLoading);
  const options = clubOptions
    ? addReactKeyByProperty(clubOptions, "code")
    : undefined;

  const [isAddOptionMode, setAddOptionMode] = useState(false);
  const [isEditOptionMode, setEditOptionMode] = useState(false);

  const [editableOption, setEditableOption] = useState<IClubOptionsItem | null>(
    null
  );

  //   add option functions
  const handleTurnOnAddOptionMode = () => {
    setAddOptionMode(true);
  };

  const handleSubmitAddOption = (values: { name: string; icon: string }) => {
    if (clubId) {
      const request = {
        clubCode: clubId,
        name: values.name,
        icon: values.icon
      };
      void dispatch(createClubOption(request));
    }
    setAddOptionMode(false);
  };

  const handleCancelAddOption = () => {
    setAddOptionMode(false);
  };

  // //   edit option
  const handleTurnOnEditOptionMode = (code: string) => {
    const editedOption = clubOptions?.find((item) => item.code === code);
    if (editedOption) {
      setEditOptionMode(true);
      setEditableOption(editedOption);
    }
  };

  const handleSubmitEditOption = (values: { name: string; icon: string }) => {
    if (editableOption) {
      const request = {
        code: editableOption?.code,
        name: values.name,
        icon: values.icon
      };
      void dispatch(editOption(request));
    }
    setEditableOption(null);
    setEditOptionMode(false);
  };

  const handleCancelEditOption = () => {
    setEditableOption(null);
    setEditOptionMode(false);
  };

  const columnsOptions: ColumnProps<IClubOptionsItem>[] = [
    {
      title: "Имя опции",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Иконка",
      dataIndex: "icon",
      key: "icon"
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <EditEntityBtn
            onEdit={() => handleTurnOnEditOptionMode(record.code)}
          />
          <DeleteEntityBtn
            onDelete={() => dispatch(deleteOption(record.code))}
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <Card
        title={<Title level={5}>Опции клуба</Title>}
        extra={
          <Button type="primary" onClick={handleTurnOnAddOptionMode}>
            Добавить
          </Button>
        }
      >
        <Table
          dataSource={options}
          columns={columnsOptions}
          pagination={false}
          loading={loading === "loading"}
        />
      </Card>
      <OptionAddModal
        isOpen={isAddOptionMode}
        onOk={handleSubmitAddOption}
        onCancel={handleCancelAddOption}
      />
      {editableOption && (
        <OptionEditModal
          isOpen={isEditOptionMode}
          onOk={handleSubmitEditOption}
          onCancel={handleCancelEditOption}
          option={editableOption}
        />
      )}
    </>
  );
};
