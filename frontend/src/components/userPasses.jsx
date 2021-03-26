import React from "react";
import { withRouter } from "react-router";
import {
  Input,
  AutoComplete,
  Layout,
  List,
  message,
  Divider,
  Row,
  Col,
  Card,
  Space,
  Button,
} from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import PaymentField from "./paymentField";

class UserPasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passes: [],
      data: [],
      price: 0,
      passName: "",
    };

    const data = ["Name: ", "Clearance Level: ", "Expiration: "];

    this.getPasses();
  }

  getPasses = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await fetch(
      "http://localhost:5000/pass/",
      options
    ).then((res) => res.json());
    this.state.passes = response.info;
    this.forceUpdate();
  };

  handleBuy = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await fetch(
      "http://localhost:5000/pass/passByName/" + this.state.passName,
      options
    ).then((res) => res.json());
    const passId = response.info[0].id;

    let session_token = sessionStorage.getItem("session_token");
    options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: session_token,
      },
    };

    response = await fetch(
      "http://localhost:5000/auth/user",
      options
    ).then((res) => res.json());

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: response.info.id,
        passId: passId,
      }),
    };

    response = await fetch(
      "http://localhost:5000/pass/purchase",
      options
    ).then((res) => res.json());
    console.log(response);
    this.props.history.push("/userdashboard");
    message.success("Parking Pass Succesfully Purchased");
  };

  getOptions() {
    const renderTitle = (title) => <span>{title}</span>;

    const renderItem = (title, count) => ({
      value: title,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <span>
            <DollarCircleOutlined /> {count}
          </span>
        </div>
      ),
    });

    let options = [
      {
        label: renderTitle("Passes"),
        options: [],
      },
    ];
    var i;
    for (i = 0; i < this.state.passes.length; i++) {
      options[0].options.push(
        renderItem(this.state.passes[i].name, this.state.passes[i].price)
      );
    }

    return options;
  }

  async populateForm(value) {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await fetch(
      "http://localhost:5000/pass/passByName/" + value,
      options
    ).then((res) => res.json());

    this.setState({
      data: [
        "Name: " + response.info[0].name,
        "Clearance Level: " + response.info[0].clearance_level,
        "Expiration: " + response.info[0].expiration,
      ],
    });
    this.setState({ price: response.info[0].price });
    this.state.passName = response.info[0].name;
  }

  render() {
    const Complete = () => (
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{ width: 250 }}
        options={this.getOptions()}
        onChange={(value) => this.populateForm(value)}
      >
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>
    );

    return (
      <Layout>
        <Divider orientation="left">Please select a Parking Pass</Divider>
        <Row gutter={5}>
          <Col span={1} />
          <Complete />
        </Row>
        <Divider />
        <Space direction="vertical">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card title="Cart" style={{ width: 600 }}>
              <List
                size="small"
                header={<p>{this.props.location.data}</p>}
                footer={
                  <div>
                    <b>Total Due: ${this.state.price}</b>
                  </div>
                }
                bordered
                dataSource={this.state.data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card title="Payment Information" style={{ width: 600 }}>
              <PaymentField />
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              icon={<DollarCircleOutlined />}
              size="large"
              onClick={() => {
                this.handleBuy();
              }}
            >
              Buy
            </Button>
          </div>
        </Space>
      </Layout>
    );
  }
}

export default withRouter(UserPasses);
