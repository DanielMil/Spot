import React from "react";
import "antd/dist/antd.css";
import { Carousel, Layout, Divider, Typography } from "antd";
import cam_mod from "../images/cam_mod.png";
import gate_horizontal from "../images/gate_horizontal.png";
import gate_top_left from "../images/gate_top_left.png";
import gate_top_right from "../images/gate_top_right.png";
//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";
import { SmileOutlined, CopyrightCircleOutlined } from "@ant-design/icons";
const contentStyle = {
  height: "100px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { Text, Title, Paragraph } = Typography;
const { Footer, Content } = Layout;
const HomePage = () => {
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
                Welcome to Spot
              </Title>
              <Divider plain>
                <Text type="success">Parking Made Easy</Text>
              </Divider>
              <Paragraph>
                Signup or Login to keep track of your parking history, manage
                parking passes, add/remove vehicles all with a single Spot
                account <SmileOutlined />
              </Paragraph>

              <Title level={3}>Just drive up, and park!</Title>
              <Paragraph>
                We do all the work, so you don't have to. Just drive up to one
                of the Spot supported parking lots and if you're authorized, you
                get let in. No more forgetting to put the parking pass on your
                dashboard. Our system scans your license plates upon entry and
                exit to let the owner know you stopped by <SmileOutlined />
              </Paragraph>
              <Paragraph>
                Look out for a sign that says "Spot Parking" or a gate similar
                to the one shown below to know you're able to use your Spot
                account to park your car.
              </Paragraph>
              <Divider />
              <Carousel autoplay effect="fade">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img style={{ marginLeft: "6em" }} src={cam_mod} />
                </div>
                <div>
                  <img style={{ marginLeft: "1em" }} src={gate_horizontal} />
                </div>
                <div>
                  <img style={{ marginLeft: "6em" }} src={gate_top_left} />
                </div>
                <div>
                  <img style={{ marginLeft: "6em" }} src={gate_top_right} />
                </div>
              </Carousel>
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
export default HomePage;
