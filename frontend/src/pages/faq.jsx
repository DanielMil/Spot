import React from "react";
import "antd/dist/antd.css";
import { Layout, Typography, Divider } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";

//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";

const { Title, Paragraph } = Typography;
const { Footer, Content } = Layout;
const Faq = () => {
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
              <Title style={{ textAlign: "center" }} level={2}>
                Frequently Asked Questions
              </Title>
              <Divider />
              <Title level={3}>What is Spot?</Title>
              <Paragraph>
                Spot is a smart parking system designed to streamline the
                parking process. We digitize the process of buying passes,
                registering cars and acquiring parking history so you can just
                drive up and park!
              </Paragraph>
              <Divider dashed="true" />
              <Title level={3}>How it works?</Title>
              <Paragraph>
                We utilize a camera and computer vision to scan your license
                plate and cross-reference that with the database to authorize
                you to park. Your license plates are scanned upon entry and exit
                if the parking lot in question allows hourly parking. The cost
                of parking is calculated upon exit and balance is paid via the
                exit kiosk. If you already bought a parking pass through the
                spot website, just drive up and park!
              </Paragraph>
              <Divider dashed="true" />
              <Title level={3}>
                Can I only park if I bought a parking pass?
              </Title>
              <Paragraph>
                The spot system allows hourly billed parking at a rate
                pre-defined by the parking lot manager. You are still able to
                park without a parking pass, although you would have to pay the
                parking balance at the exit kiosk.
              </Paragraph>
              <Divider dashed="true" />
              <Title level={3}>How many cars can use my parking pass</Title>
              <Paragraph>
                You can attach upto 3 cars to a spot account. As long as the car
                is registered on your account. The parking pass is valid for
                that vehicle.
              </Paragraph>
              <Divider dashed="true" />
              <Title level={3}>If I have a balance, how do I pay?</Title>
              <Paragraph>
                During the exit process, a square terminal is provided for cash
                less transactions. The invoice for these transactions can be
                seen in your online Spot account.
              </Paragraph>
              <Divider dashed="true" />
              <Title level={3}>What if the parking lot is full?</Title>
              <Paragraph>
                If the parking lot is full, the light at the entrance gate will
                be illuminated red. The gate shall also remain closed if the
                parking lot is at capacity.
              </Paragraph>
              <Divider dashed="true" />
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
export default Faq;
