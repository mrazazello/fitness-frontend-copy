import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

type sortDirections = "up" | "down";

type TProps = {
  code: string;
  onSort: (code: string, direction: sortDirections) => void;
};

export const Sorter = (props: TProps) => {
  const { code, onSort } = props;

  return (
    <Space>
      <Button
        icon={<ArrowUpOutlined />}
        size="small"
        onClick={() => onSort(code, "up")}
      />
      <Button
        icon={<ArrowDownOutlined />}
        size="small"
        onClick={() => onSort(code, "down")}
      />
    </Space>
  );
};
