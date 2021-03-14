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

      this.fetchCars();
  }

    handleRemove = async (id) => {
      console.log(id);
      let options = {
        method: "DELETE"
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

      
      console.log(response.info.id, this.plate, this.make, this.model);

      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            make : this.make,
            model : this.model,
            plateNumber: this.plate,
            userId: response.info.id
          })
      }
  
      response = await fetch('http://localhost:5000/car/', options).then(res => res.json());
      await this.fetchCars();
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
    
    const dataSource = [
      {
        key: '1',
        make: 'Mike',
        model: 32,
        plate_number: '10 Downing Street',
      },
      {
        key: '2',
        make: 'John',
        model: 42,
        plate_number: '10 Downing Street',
      },
    ];
    
    this.state.filteredData = response.info;
    console.log(this.state.filteredData);
    this.forceUpdate();
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
              key: 'plate_number',
              dataIndex: 'plate_number',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, Remove) => (
                  <Space size="middle">
                    <a  onClick={() => {this.handleRemove(Remove.id)}} >
                        Remove
                    </a>
                  </Space>
                ),
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

        let locale = {
          emptyText: 'Abc',
        };
           
        return(
            <>    
                <Table dataSource={this.state.filteredData} columns={columns} />
                <Form {...formItemLayout} layout='horizontal'>
                    
                    <Form.Item label="Make" >
                        <Input onChange={e => this.make = e.target.value} placeholder="Make of Vehicle" />
                    </Form.Item>
                    <Form.Item label="Model">
                        <Input onChange={e => this.model = e.target.value} placeholder="Model of Vehicle" />
                    </Form.Item>
                    <Form.Item label="License Plate">
                        <Input onChange={e => this.plate = e.target.value} placeholder="Registration of Vehicle" />
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
