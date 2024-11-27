import { SmileOutlined } from "@ant-design/icons";
import { Card, Result } from "antd";

const Main = () => {
  return (
    <Card>
      <Result
        icon={<SmileOutlined />}
        title="Добро пожаловать в систему управления сайтом Фитнес-Империи."
      />
    </Card>
  );
};

export default Main;
