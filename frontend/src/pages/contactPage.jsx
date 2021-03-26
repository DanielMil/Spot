import { React, useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Card, Row, Col, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  CopyrightCircleOutlined,
} from "@ant-design/icons";
//components
import { ReactComponent as Logo } from "../images/logo.svg";
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";
const { Meta } = Card;
const { Footer, Content } = Layout;
const ContactPage = () => {
  const [message, setMessage] = useState("1-888-THE-SPOT (1-888-843-7768)");
  const [moizmessage, setmoizMessage] = useState("1-888-843-7768 ext 0403");
  const [raymessage, setrayMessage] = useState("1-888-843-7768 ext 8008");
  const [danmessage, setdanMessage] = useState("1-888-843-7768 ext 6969");
  const [milmessage, setmilMessage] = useState("1-888-843-7768 ext 0420");

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
              <Divider> Spot Help Contact </Divider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  style={{ width: 300 }}
                  cover={<Logo />}
                  actions={[
                    <MailOutlined
                      key="setting"
                      onClick={() => setMessage("help@spot.com")}
                    />,
                    <PhoneOutlined
                      key="edit"
                      onClick={() =>
                        setMessage("1-888-THE-SPOT (1-888-843-7768)")
                      }
                    />,
                  ]}
                >
                  <Meta title="Spot Contact" description={message} />
                </Card>
              </div>
              <Divider orientation="left"> Developer Contact </Divider>
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  <Col span={6}>
                    <Card
                      cover={<Logo />}
                      actions={[
                        <MailOutlined
                          key="setting"
                          onClick={() => setmoizMessage("moiz@spot.com")}
                        />,
                        <PhoneOutlined
                          key="edit"
                          onClick={() =>
                            setmoizMessage("1-888-843-7768 ext 0403")
                          }
                        />,
                      ]}
                    >
                      <Meta title="Moiz Naveed" description={moizmessage} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      cover={<Logo />}
                      actions={[
                        <MailOutlined
                          key="setting"
                          onClick={() => setdanMessage("danyal@spot.com")}
                        />,
                        <PhoneOutlined
                          key="edit"
                          onClick={() =>
                            setdanMessage("1-888-843-7768 ext 6969")
                          }
                        />,
                      ]}
                    >
                      <Meta title="Danyal Mahmood" description={danmessage} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      cover={<Logo />}
                      actions={[
                        <MailOutlined
                          key="setting"
                          onClick={() => setmilMessage("daniel@spot.com")}
                        />,
                        <PhoneOutlined
                          key="edit"
                          onClick={() =>
                            setmilMessage("1-888-843-7768 ext 0420")
                          }
                        />,
                      ]}
                    >
                      <Meta title="Daniel Mil" description={milmessage} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      cover={<Logo />}
                      actions={[
                        <MailOutlined
                          key="setting"
                          onClick={() => setrayMessage("raymond@spot.com")}
                        />,
                        <PhoneOutlined
                          key="edit"
                          onClick={() =>
                            setrayMessage("1-888-843-7768 ext 8008")
                          }
                        />,
                      ]}
                    >
                      <Meta title="Raymond Nguyen" description={raymessage} />
                    </Card>
                  </Col>
                </Row>
              </div>
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
export default ContactPage;
