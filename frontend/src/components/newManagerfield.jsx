import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { withRouter } from "react-router";

class NewManagerField extends React.Component {
  handleSubmit = async (credentials) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email,
        password: this.pass,
        isOwner: true,
      }),
    };

    let response = await fetch(
      "http://localhost:5000/auth/register/",
      options
    ).then((res) => res.json());

    console.log(response.status);
    if (response.status === "Success") {
      this.props.history.push("/managerlogin");
    }
  };

  render() {
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 10,
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
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        {/* First Name Field*/}
        <Form.Item
          name={["user", "firstname"]}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
          wrapperCol={{ ...layout.wrapperCol, offset: 3 }}
        >
          <Input onChange={(e) => (this.firstname = e.target.value)} />
        </Form.Item>

        {/* Last Name Field*/}
        <Form.Item
          name={["user", "lastname"]}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
          wrapperCol={{ ...layout.wrapperCol, offset: 3 }}
        >
          <Input onChange={(e) => (this.lastname = e.target.value)} />
        </Form.Item>

        {/* EMAIL Field*/}
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
          wrapperCol={{ ...layout.wrapperCol, offset: 3 }}
        >
          <Input onChange={(e) => (this.email = e.target.value)} />
        </Form.Item>

        {/*Password Field*/}
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
          wrapperCol={{ ...layout.wrapperCol, offset: 3 }}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => (this.pass = e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 19 }}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(NewManagerField);
