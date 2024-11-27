import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { ShowToastMessage } from "@shared/api/error";
import Logo from "@shared/ui/Logo/Logo";

const { Header, Content, Footer } = Layout;

export const PublicLayoutTemplate = () => {
  return (
    <Layout className="public-layout">
      <Header>
        <Logo />
      </Header>
      <ShowToastMessage />
      <Content className="site-layout-content">
        <Outlet />
      </Content>
      <Footer className="site-footer">© Interso 2024</Footer>
    </Layout>
  );
};
