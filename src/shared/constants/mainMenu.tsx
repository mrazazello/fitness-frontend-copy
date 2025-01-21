import type { ItemType } from "antd/lib/menu/hooks/useItems";
import { Link } from "react-router-dom";

import frontendPaths from "@app/providers/RouteProvider/routes";

const menuItems: ItemType[] = Object.values(frontendPaths)
  .filter((item) => item.mainMenu === true)
  .map((item) => {
    return {
      key: item.URL(),
      label: <Link to={item.URL()}>{item.title}</Link>,
      icon: item.icon
    };
  });

export const mobileMenuItems: ItemType[] = [
  ...menuItems,
  {
    type: "divider"
  },
  {
    key: frontendPaths.logout.URL(),
    label: (
      <Link to={frontendPaths.logout.URL()}>{frontendPaths.logout.title}</Link>
    )
  }
];

export default menuItems;
