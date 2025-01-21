import { EllipsisOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import type { ReactElement } from "react";

type IActionMenuProperties = {
  key: React.Key;
  title: string;
  element: ReactElement;
};

type TProps = {
  className?: string;
  menu: IActionMenuProperties[];
};

const TableActionsMenu = (props: TProps) => {
  const { menu, className } = props;

  const items: MenuProps["items"] = menu.map((item) => ({
    key: item.key,
    label: item.element
  }));

  return (
    <Dropdown menu={{ items }} placement="topRight" className={className} arrow>
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};

export default TableActionsMenu;
