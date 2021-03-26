import React from "react";
import { Layout, message } from "antd";
import {
  CarOutlined,
  LaptopOutlined,
  HomeOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      isOwner: false,
    };

    this.loginCheck();
  }

  loginCheck = async (credentials) => {
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
    if (response.status === "Success") {
      let loggedin = true;
      this.state.isOwner = response.info.isOwner;
      this.setState({ loggedin });
    }
  };

  logoutcheck = async (credentials) => {
    let session_token = sessionStorage.getItem("session_token");
    let options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: session_token,
      },
    };
    let response = await fetch(
      "http://localhost:5000/auth/logout",
      options
    ).then((res) => res.json());
    if (response.status === "Success") {
      let loggedin = false;
      this.setState({ loggedin });
      sessionStorage.removeItem("session_token");
      this.props.history.push("/");
      message.success("Logged Out Successfully");
    }
  };

  handleClick = (e) => {
    if (e.key === "goHome") {
      this.props.history.push("/");
    }
    if (e.key === "gotologin") {
      this.props.history.push("/login");
    }
    if (e.key === "gotosignup") {
      this.props.history.push("/signup");
    }
    if (e.key === "gotofaq") {
      this.props.history.push("/faq");
    }
    if (e.key === "gotocontact") {
      this.props.history.push("/contact");
    }
    if (e.key === "gotomanlogin") {
      this.props.history.push("/managerlogin");
    }
    if (e.key === "gotomansignup") {
      this.props.history.push("/managersignup");
    }
    if (e.key === "gotodash") {
      if (this.state.isOwner) {
        this.props.history.push("/managerdashboard");
      } else {
        this.props.history.push("/userdashboard");
      }
    }
    if (e.key === "gotologout") {
      this.logoutcheck();
    }
  };

  render() {
    if (this.state.loggedin) {
      return (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            onClick={this.handleClick}
            style={{ width: 200 }}
            //defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.Item key="goHome" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <SubMenu
              key="sub2"
              icon={<CarOutlined />}
              title="DashBoard Control"
            >
              <Menu.Item key="gotodash">Dashboard</Menu.Item>
              <Menu.Item key="gotologout">LogOut</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<CustomerServiceOutlined />} title="Help">
              <Menu.Item key="gotofaq">FAQs</Menu.Item>
              <Menu.Item key="gotocontact">Contact</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      );
    }
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          onClick={this.handleClick}
          style={{ width: 200 }}
          //defaultSelectedKeys={['1']}
          //defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="goHome" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub2" icon={<CarOutlined />} title="Parking User">
            <Menu.Item key="gotologin">Log in</Menu.Item>
            <Menu.Item key="gotosignup">Register</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<LaptopOutlined />} title="Lot Manager">
            <Menu.Item key="gotomanlogin">Log in</Menu.Item>
            <Menu.Item key="gotomansignup">Register</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<CustomerServiceOutlined />} title="Help">
            <Menu.Item key="gotofaq">FAQs</Menu.Item>
            <Menu.Item key="gotocontact">Contact</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SiderMenu);
