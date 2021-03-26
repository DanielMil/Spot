import React from "react";
import "antd/dist/antd.css";
import { Layout, Divider, Row, Card, Alert } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";

//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";
import ManagerLogInField from "../components/managerloginfield";

const { Footer, Content } = Layout;
const ManagerLogIn = () => {
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
              <Row type="flex" align="center">
                <Card style={{ width: 600 }}>
                  <Alert
                    style={{ textAlign: "center" }}
                    message="Please enter your login credentials below."
                    type="info"
                  />
                  <Divider />
                  <ManagerLogInField />
                </Card>
              </Row>
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
export default ManagerLogIn;
