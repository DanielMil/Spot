import React from 'react';
import { withRouter } from "react-router";
import { Table, Space, InputNumber } from 'antd';



class LotInformation extends React.Component{
  constructor(props) {
    super(props)
    this.state ={
      lots: [],
      passes:[]
    }

    this.fetchLots();
    this.getPasses();
  }

  edit(editId, pass) {
    this.props.history.push({
      pathname: '/editlotinfo',
      state: [editId, pass]
    })
  }

  passedit(passid) {
    this.props.history.push({
      pathname: '/editpassinfo',
      state: [passid]
    })
  }

  getPasses = async () => {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let response = await fetch('http://localhost:5000/pass/', options).then((res) => res.json());
    this.state.passes = response.info;
    this.forceUpdate();
}

  async fetchLots() {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    let response = await fetch('http://localhost:5000/lot/all', options).then((res) => res.json());
    this.state.lots = response.info;
    console.log(this.state.lots);
    this.forceUpdate();
  }
    
    render(){
        function onChange(value) {
            console.log('changed', value);
        }
        const lotdata = [
            {
              parkinglot: 'Pearson Park and Fly',
              
            },
            
        ];

        const passcolumns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Number Available',
            dataIndex: 'num_available',
            key: 'num_available',
          },
          {
            title: 'Pass Level',
            dataIndex: 'clearance_level',
            key: 'clearance_level',
          },
          {
            title: 'Expiration',
            dataIndex: 'expiration',
            key: 'expiration',
          },
          {
            title: 'Edit',
            key: 'edit',
            render: (text, Edit) => (
              <Space size="middle">
                <a  onClick={() => {this.passedit(Edit.id)}} >
                    Edit
                </a>
              </Space>
            ),
          }
      ];
        
        const lotcolumns = [
            {
              title: 'Parking Lot',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Available Spaces',
              dataIndex: 'curr_capacity',
              key: 'curr_capacity',
            },
            {
              title: 'Total Spaces',
              dataIndex: 'max_capacity',
              key: 'max_capacity',
            },
            {
              title: 'Rate',
              dataIndex: 'rate',
              key: 'rate',
            },
            {
              title: 'Pass Level',
              dataIndex: 'allowable_pass_level',
              key: 'allowable_pass_level',
            },
            {
              title: 'Edit',
              key: 'edit',
              render: (text, Edit) => (
                <Space size="middle">
                  <a  onClick={() => {this.edit(Edit.id, Edit.pass_id)}} >
                      Edit
                  </a>
                </Space>
              ),
            }
        ];

        return(
          <div>
            <Space>
              <h1>Lots</h1>
              <Table dataSource={this.state.lots} columns={lotcolumns} />
            </Space>
            <Space>
              <h1>Passes</h1>
              <Table dataSource={this.state.passes} columns={passcolumns} />
            </Space>
          </div>
        );
    }
}


export default withRouter(LotInformation); 
