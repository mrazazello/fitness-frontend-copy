import { EditOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

type TProps = {
  onEdit: () => void;
  inMenu?: boolean;
};

const { Text } = Typography;

export const EditEntityBtn = (props: TProps) => {
  const { onEdit, inMenu = false } = props;

  return inMenu ? (
    <Text onClick={onEdit}>Редактировать</Text>
  ) : (
    <Button icon={<EditOutlined />} onClick={onEdit} size="small">
      Редактировать
    </Button>
  );
};
