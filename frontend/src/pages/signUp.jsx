import React from "react";
import "antd/dist/antd.css";
import { Layout, Row, Card, Alert, Divider } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";

//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";
import NewUserField from "../components/newUserfield";

const { Footer, Content } = Layout;
const SignUp = () => {
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
                    message="Please enter your information to register below."
                    type="info"
                  />
                  <Divider />
                  <NewUserField />
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
export default SignUp;
