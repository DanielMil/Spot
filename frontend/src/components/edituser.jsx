import React from "react";
import { Form, Input, InputNumber, Button, Divider } from "antd";
import { withRouter } from "react-router";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    };
    this.getUserInfo();
  }

  getUserInfo = async () => {
    let session_token = sessionStorage.getItem("session_token");
    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: session_token,
      },
    };
    let response = await fetch(
      "http://localhost:5000/auth/user",
      options
    ).then((res) => res.json());
    this.state.firstName = response.info.firstName;
    this.state.lastName = response.info.lastName;
    this.state.email = response.info.email;
    this.state.id = response.info.id;
    this.forceUpdate();
  };

  handleSubmit = async () => {
    let session_token = sessionStorage.getItem("session_token");

    let options = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: session_token,
      },
      body: JSON.stringify({
        firstName: this.first,
        lastName: this.last,
        email: this.em,
      }),
    };

    let response = await fetch(
      "http://localhost:5000/auth/user",
      options
    ).then((res) => res.json());
    console.log(response);
    this.props.history.push("/userservicesmanagement");
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
        <h2>Please change information as needed and click "submit"</h2>
        <Divider />
        {/* First Name Field*/}
        <Form.Item
          name={["user", "firstname"]}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type="text"
            key={`${Math.floor(Math.random() * 1000)}-min`}
            defaultValue={this.state.firstName}
            onChange={(e) => (this.first = e.target.value)}
          />
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
        >
          <Input
            type="text"
            key={`${Math.floor(Math.random() * 1000)}-min`}
            defaultValue={this.state.lastName}
            onChange={(e) => (this.last = e.target.value)}
          />
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
        >
          <Input
            type="text"
            key={`${Math.floor(Math.random() * 1000)}-min`}
            defaultValue={this.state.email}
            onChange={(e) => (this.em = e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(EditUser);
