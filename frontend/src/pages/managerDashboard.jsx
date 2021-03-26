import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";

//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";
import ManagerDashContent from "../components/managerdashContent";

const { Footer, Content } = Layout;
const ManagerDashBoardPage = () => {
  return (
    <Layout>
      <Layout>
        <SiteHeader />
      </Layout>
      <Layout>
        <SiderMenu />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 768 }}
            >
              <ManagerDashContent />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Univeristy of Guelph Class of 2021, Group 50
            <CopyrightCircleOutlined />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default ManagerDashBoardPage;
