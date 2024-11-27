import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { ReactElement } from "react";

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

  const items: MenuProps["items"] = menu.map((item) => {
    return {
      key: item.key,
      label: item.element
    };
  });

  return items ? (
    <Dropdown menu={{ items }} placement="topRight" className={className} arrow>
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  ) : null;
};

export default TableActionsMenu;
