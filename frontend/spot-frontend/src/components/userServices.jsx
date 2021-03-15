import React from 'react';
import { withRouter } from "react-router";
import { Card, Col, Row, Table, Space } from 'antd';



class UserServices extends React.Component{
    
    
    render(){
        const userinfodata = [
            {
              firstname: 'Danial',
              lastname: 'The Manial',
              email: 'denial@menial.ca',
            },
            
        ];
        
        const userinfocolumns = [
            {
              title: 'First Name',
              dataIndex: 'firstname',
              key: 'firstname',
            },
            {
              title: 'Last Name',
              dataIndex: 'lastname',
              key: 'lastname',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                    <a data-id={record.name} onClick={() => { }}>
                        Change
                     </a>
                  </Space>
                ),
            }
        ];
        const passdata = [
            {
              id: '0076969',
              price: '$300',
              acquisition: '30/12/1997',
              expiration: '30/12/2997',
              clearance: 'where u want bro',
            },
            
        ];
        
        const passcolumns = [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'Acquisition',
              dataIndex: 'acquisition',
              key: 'acquisition',
            },
            {
                title: 'Expiration',
                dataIndex: 'expiration',
                key: 'expiration',
            },
            {
                title: 'Clearance',
                dataIndex: 'clearance',
                key: 'clearance',
            },
        ];
        const historydata = [
            {
              parkinglot: 'Pearson Park and Fly',
              timein: '30/12/1997 10 am',
              timeout: '30/12/2997 10 pm',
            },
            
        ];
        
        const historycolumns = [
            {
              title: 'Parking Lot',
              dataIndex: 'parkinglot',
              key: 'parkinglot',
            },
            {
              title: 'Time In',
              dataIndex: 'timein',
              key: 'timein',
            },
            {
              title: 'Time Out',
              dataIndex: 'timeout',
              key: 'timeout',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                    <a data-id={record.name} onClick={() => { this.props.history.push({
                                                            pathname: '/payment',
                                                            data: record.name
                                                          }) }}>
                        Pay
                     </a>
                  </Space>
                ),
            }
        ];
        return(
            <div className="site-card-wrapper">
                <Space direction="vertical" size='large'>
                  <Card title="Parking History" bordered={false}>
                    <Table dataSource={historydata} columns={historycolumns} />
                  </Card>
                  <Card title="User Information" bordered={false}>
                    <Table dataSource={userinfodata} columns={userinfocolumns} />
                  </Card>
                  <Card title="Active Passes" bordered={false}>
                    <Table dataSource={passdata} columns={passcolumns} />
                  </Card>
                </Space>
            </div>
        );
    }
}


export default withRouter(UserServices); 
