import React from "react";
import { withRouter } from "react-router";
import { Card, Table, Space } from "antd";

class UserServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredHistoryData: [],
      filteredUserData: [],
      filteredPassData: [],
    };

    this.fetchParkingHistory();
    this.fetchUserInfo();
    this.fetchActivePasses();
  }

  edit() {
    this.props.history.push({ pathname: "/edituserinfo" });
  }
  fetchParkingHistory = async () => {
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

    options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    response = await fetch(
      "http://localhost:5000/history/" + response.info.id,
      options
    ).then((res) => res.json());

    this.state.filteredHistoryData = response.info;
    this.forceUpdate();
  };

  fetchUserInfo = async () => {
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

    /*
    options = {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: session_token,
        }
    };

    response = await fetch('http://localhost:5000/auth/user' + response.info.id, options).then((res) => res.json());
   */
    this.state.filteredUserData.firstName = response.info.firstName;
    this.state.filteredUserData.lastName = response.info.lastName;
    this.state.filteredUserData.email = response.info.email;

    this.forceUpdate();
  };

  fetchActivePasses = async () => {
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

    options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    response = await fetch(
      "http://localhost:5000/pass/" + response.info.id,
      options
    ).then((res) => res.json());

    this.state.filteredPassData = response.info;
    this.forceUpdate();
  };

  render() {
    const userinfodata = [
      {
        firstName: this.state.filteredUserData.firstName,
        lastName: this.state.filteredUserData.lastName,
        email: this.state.filteredUserData.email,
      },
    ];

    const userinfocolumns = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.edit();
              }}
            >
              Change
            </a>
          </Space>
        ),
      },
    ];

    const passcolumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Acquisition",
        dataIndex: "acquisition",
        key: "acquisition",
      },
      {
        title: "Expiration",
        dataIndex: "expiration",
        key: "expiration",
      },
      {
        title: "Clearance",
        dataIndex: "clearance_level",
        key: "clearance_level",
      },
    ];

    const historycolumns = [
      {
        title: "Parking Lot ID",
        dataIndex: "lot_id",
        key: "lot_id",
      },
      {
        title: "Time In",
        dataIndex: "timestamp_in",
        key: "timestamp_in",
      },
      {
        title: "Time Out",
        dataIndex: "timestamp_out",
        key: "timestamp_out",
      },
      {
        title: "Cost",
        dataIndex: "cost",
        key: "cost",
      },
    ];
    return (
      <div className="site-card-wrapper">
        <Space direction="vertical" size="large">
          <Card title="Parking History" bordered={false}>
            <Table
              dataSource={this.state.filteredHistoryData}
              columns={historycolumns}
            />
          </Card>
          <Card title="User Information" bordered={false}>
            <Table dataSource={userinfodata} columns={userinfocolumns} />
          </Card>
          <Card title="Active Passes" bordered={false}>
            <Table
              dataSource={this.state.filteredPassData}
              columns={passcolumns}
            />
          </Card>
        </Space>
      </div>
    );
  }
}

export default withRouter(UserServices);
