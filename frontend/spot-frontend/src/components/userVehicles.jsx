import React from 'react';
import { withRouter } from "react-router";
import { Table, Space } from 'antd';
import { Form, Input, Button, Radio } from 'antd'


class UserVehicles extends React.Component{

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

      let response = await fetch('http://localhost:5000/auth/user', options).then((res) => res.json());

      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            make : this.make,
            model : this.model,
            plate_number: this.plate,
            user_id: response.info.id
          })
      }
  
      response = await fetch('http://localhost:5000/car/', options).then(res => res.json())
      this.fetchCars();
      console.log(response);
  }

  fetchCars = async () => {
    let session_token = sessionStorage.getItem("session_token");
    let options = {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: session_token,
        },
    };

    let response = await fetch('http://localhost:5000/auth/user', options).then((res) => res.json());

    options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    response = await fetch('http://localhost:5000/car/' + response.info.id, options).then((res) => res.json());
    return response;
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
                    <a  onClick={this.handleRemove(Remove.id)} >
                        Remove
                    </a>
                  </Space>
                ),
            },
          ];

          let session_token = sessionStorage.getItem("session_token");
          let options = {
              method: "GET",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: session_token,
              },
          };

          this.data = this.fetchCars();
        
          const formItemLayout = {
         
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
          }
      
        const buttonItemLayout =
        {
          wrapperCol: { span: 14, offset: 4 },
        }

        const data = [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          },
        ];
           
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
                        <Button type="primary" onClick={() => { this.handleSubmit() }}>Submit</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}


export default withRouter(UserVehicles); 
