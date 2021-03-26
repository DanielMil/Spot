import React from "react";
import { withRouter } from "react-router";
import {
  Input,
  InputNumber,
  Form,
  Space,
  DatePicker,
  Button,
  Divider,
  message,
} from "antd";

class ManagerRegisterParkingPass extends React.Component {
  formRef = React.createRef();
  handleSubmit = async () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: this.price,
        clearanceLevel: this.clearancelevel,
        numAvailable: this.quantity,
        expiration: this.expDate.format("YYYY-MM-DD"),
        acquisition: "2020-04-11",
        name: this.name,
      }),
    };

    let response = await fetch(
      "http://localhost:5000/pass/",
      options
    ).then((res) => res.json());

    console.log(response);
    this.formRef.current.resetFields();
    this.props.history.push("/managerdashboard");
    message.success("Pass Created!");
  };

  render() {
    const layout = {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 11,
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    return (
      <>
        <Space direction="vertical">
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            ref={this.formRef}
            name="control-ref"
          >
            <Form.Item
              label="Name"
              wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
            >
              <Input onChange={(e) => (this.name = e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Price"
              rules={[
                {
                  type: "number",
                },
              ]}
              wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
            >
              <InputNumber
                style={{
                  width: 200,
                }}
                min="0"
                step="0.01"
                onChange={(value) => (this.price = value)}
                stringMode
              />
            </Form.Item>
            <Form.Item
              name={["user", "clearancelevel"]}
              label="Clearance "
              rules={[
                {
                  type: "number",
                },
              ]}
              wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
            >
              <InputNumber
                min={1}
                max={10}
                onChange={(value) => (this.clearancelevel = value)}
              />
            </Form.Item>
            <Form.Item
              name={["user", "quantity"]}
              label="Quantity"
              rules={[
                {
                  type: "number",
                },
              ]}
              wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
            >
              <InputNumber
                min={1}
                onChange={(value) => (this.quantity = value)}
              />
            </Form.Item>
            <DatePicker
              onChange={(value) => (this.expDate = value)}
              placeholder="Expiration Date"
            />
            <Divider />

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </>
    );
  }
}

export default withRouter(ManagerRegisterParkingPass);
