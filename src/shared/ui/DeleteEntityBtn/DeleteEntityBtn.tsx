import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Typography } from "antd";

type TProps = {
  text?: string;
  inMenu?: boolean;
  onDelete: () => void;
};

const { Text } = Typography;

export const DeleteEntityBtn = (props: TProps) => {
  const { text = "Удалить запись?", inMenu = false, onDelete } = props;

  return (
    <Popconfirm
      title={text}
      onConfirm={onDelete}
      placement="left"
      okText="Да"
      cancelText="Нет"
    >
      {inMenu ? (
        <Text>Удалить</Text>
      ) : (
        <Button icon={<DeleteOutlined />} size="small" />
      )}
    </Popconfirm>
  );
};
