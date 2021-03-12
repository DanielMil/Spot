import React from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import { Table, Space } from 'antd';
import { Form, Input, Button, Radio } from 'antd'


class UserVehicles extends React.Component{
    /**state = {};
    componentDidMount(){
        axios.get('user').then(
            res => {
                this.setState({
                    user: res.data
                });
            },
            err => {
                console.log(err);
            } 
        )
    }**/
    handleRemove = async (id) => {
      let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

      let response = await fetch('http://localhost:5000/car/' + id, options).then((res) => res.json());
    }

    handleSubmit = async (credentials) => {
      let session_token = sessionStorage.getItem("session_token");
      let options = {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
              Authorization: session_token,
          },
      };

      let response = await fetch(URL.user, options).then((res) => res.json());

      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            make : this.make,
            model : this.model,
            plate_number: this.plate,
            user_id: response.user.id
          })
      }
  
      response = await fetch('http://localhost:5000/car/', options).then(res => res.json())
  
      console.log(response);
  }
      
    render(){
        const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Make',
              dataIndex: 'make',
              key: 'make',
            },
            {
              title: 'Model',
              dataIndex: 'model',
              key: 'model',
            },
            {
              title: 'Plate',
              key: 'plate',
              dataIndex: 'plate',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, Remove) => (
                  <Space size="middle">
                    <a  onClick={this.handleRemove(1)} >
                        Remove
                    </a>
                  </Space>
                ),
            },
          ];
          
          const data = [
            {
              id: '1',
              make: 'John Brown',
              model: 32,
              plate: 'New York No. 1 Lake Park',
            },
            {
              id: '2',
              make: 'Jim Green',
              model: 42,
              plate: 'London No. 1 Lake Park',
            },
            {
              id: '3',
              make: 'Joe Black',
              model: 32,
              plate: 'Sidney No. 1 Lake Park',
            },
            
          ];
        
          const formItemLayout = {
         
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
          }
      
        const buttonItemLayout =
          {
                wrapperCol: { span: 14, offset: 4 },
              }
           
        return(
            <>    
                <Table dataSource={data} columns={columns} />
                <Form {...formItemLayout} layout='horizontal'>
                    
                    <Form.Item label="Make" >
                        <Input placeholder="Make of Vehicle" />
                    </Form.Item>
                    <Form.Item label="Model">
                        <Input placeholder="Model of Vehicle" />
                    </Form.Item>
                    <Form.Item label="License Plate">
                        <Input placeholder="Registration of Vehicle" />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}


export default withRouter(UserVehicles); 
