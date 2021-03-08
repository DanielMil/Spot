import React from 'react';
import { Layout } from 'antd';
import { CarOutlined, LaptopOutlined, HomeOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const {  Sider } = Layout;

class SiderMenu extends React.Component{

   
  
  handleClick = e => {
        if (e.key==="goHome"){
          this.props.history.push("/")
        }
        if (e.key==="gotologin"){
          this.props.history.push("/login")
        }
        if(e.key==="gotosignup"){
          this.props.history.push("/signup")
        }
        if(e.key==="gotofaq"){
          this.props.history.push("/faq")
        }
        if(e.key==="gotocontact"){
          this.props.history.push("/contact")
        }
        if(e.key==="gotomanlogin"){
          this.props.history.push("/managerlogin")
        }
        if(e.key==="gotomansignup"){
          this.props.history.push("/managersignup")
        }
      };
    
      render() {
        return (
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
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
              <SubMenu key="sub1" icon={<CarOutlined />} title="Parking User">
                <Menu.Item key="gotologin" >Log in</Menu.Item>
                <Menu.Item key="gotosignup">Register</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Lot Manager">
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
