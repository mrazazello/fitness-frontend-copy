import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import menuItems, { mobileMenuItems } from "@shared/constants/mainMenu";
import Logo from "@shared/ui/Logo/Logo";
import { useLogout } from "@entities/auth";
import { ShowToastMessage } from "@shared/api/error";

import "antd/dist/antd.min.css";

const { Header, Content, Footer, Sider } = Layout;

export const AdminLayoutTemplate = () => {
  const logout = useLogout();
  const location = useLocation();
  const locationSection = `/${location.pathname.split("/")[1]}`;

  const items = [{ label: "Выход", key: "item-1", onClick: () => logout() }];

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <Layout className="mainLayout">
      <Sider width={200} collapsible theme="dark">
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[locationSection]}
        />
      </Sider>
      <Layout>
        <Header className="site-layout-background">
          <Button
            className="mMenuBtn"
            onClick={() => setDrawerIsOpen(true)}
            icon={<MenuOutlined />}
          />
          <Drawer
            title="Главное меню"
            placement="right"
            closable
            onClose={() => setDrawerIsOpen(false)}
            open={drawerIsOpen}
          >
            <Menu
              mode="inline"
              items={mobileMenuItems}
              selectedKeys={[locationSection]}
              onClick={() => setDrawerIsOpen(false)}
            />
          </Drawer>
          <Dropdown menu={{ items }} className="logoutBtn">
            <Button icon={<UserOutlined />}>Admin</Button>
          </Dropdown>
        </Header>
        <ShowToastMessage />
        <Content className="site-layout-content">
          <Outlet />
        </Content>
        <Footer className="site-footer">© Interso 2024</Footer>
      </Layout>
    </Layout>
  );
};
