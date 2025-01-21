import { Button, Card, Space, Table, Typography } from "antd";
import type { ColumnProps } from "antd/lib/table";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { DeleteEntityBtn } from "@shared/ui/DeleteEntityBtn/DeleteEntityBtn";
import { EditEntityBtn } from "@shared/ui/EditEntityBtn/EditEntityBtn";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import {
  getClubAreas,
  getClubAreasLoading
} from "../model/selectors/clubAreasSelectors";
import { deleteArea } from "../model/service/deleteArea";
import { fetchClubAreas } from "../model/service/fetchClubAreas";
import type { IClubAreasItem } from "../model/types/clubAreas";

import ClubAreaAddModal from "./ClubAreaAddModal";
import ClubAreaEditModal from "./ClubAreaEditModal";

const { Title } = Typography;

type TProps = {
  clubId: string;
};

export const ClubAreasList = (props: TProps) => {
  const { clubId } = props;
  const dispatch = useAppDispatch();

  const [isAddRoomMode, setAddRoomMode] = useState(false);
  const [isEditRoom, setEditRoom] = useState<IClubAreasItem | null>(null);

  useEffect(() => {
    if (clubId) {
      void dispatch(fetchClubAreas(clubId));
    }
  }, []);

  const clubAreas = useAppSelector(getClubAreas);
  const areas = clubAreas
    ? addReactKeyByProperty(clubAreas, "code")
    : undefined;
  const loading = useAppSelector(getClubAreasLoading);

  const handleTurnOnEditRoomMode = (code: string) => {
    const editedArea = clubAreas?.find((item) => item.code === code);
    if (editedArea) setEditRoom(editedArea);
  };

  const columnsRooms: ColumnProps<IClubAreasItem>[] = [
    {
      title: "Имя зала",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <EditEntityBtn onEdit={() => handleTurnOnEditRoomMode(record.code)} />
          <DeleteEntityBtn onDelete={() => dispatch(deleteArea(record.code))} />
        </Space>
      )
    }
  ];

  return (
    <>
      <Card
        title={<Title level={5}>Залы клуба</Title>}
        extra={
          <Button type="primary" onClick={() => setAddRoomMode(true)}>
            Добавить
          </Button>
        }
      >
        <Table
          dataSource={areas}
          columns={columnsRooms}
          pagination={false}
          loading={loading === "loading"}
        />
      </Card>

      <ClubAreaAddModal
        clubId={clubId}
        isOpen={isAddRoomMode}
        setIsOpen={setAddRoomMode}
      />
      <ClubAreaEditModal isEditRoom={isEditRoom} setIsEditRoom={setEditRoom} />
    </>
  );
};
