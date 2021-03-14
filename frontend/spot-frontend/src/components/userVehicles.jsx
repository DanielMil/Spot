import React from 'react';
import { withRouter } from "react-router";
import { Table, Space } from 'antd';
import { Form, Input, Button, Radio } from 'antd'


class UserVehicles extends React.Component{
  constructor(props) {
      super(props)
      this.state ={
        filteredData: []
      }
  }

    handleRemove = async (id) => {
      let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

      await fetch('http://localhost:5000/car/' + id, options).then((res) => res.json());
      this.fetchCars();
    }

    handleSubmit = async () => {
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
  
      response = await fetch('http://localhost:5000/car/', options).then(res => res.json());
      console.log(response);
      this.fetchCars();
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
    console.log(response)
    this.state.filteredData = response.info;
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

          this.fetchCars();
        
          const formItemLayout = {
         
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
          }
      
        const buttonItemLayout =
        {
          wrapperCol: { span: 14, offset: 4 },
        }

        let locale = {
          emptyText: 'Abc',
        };
           
        return(
            <>    
                <Table dataSource={this.state.filteredData} columns={columns} />
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
                        <Button type="primary" onClick={async () => { await this.handleSubmit() }}>Submit</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}


export default withRouter(UserVehicles); 
