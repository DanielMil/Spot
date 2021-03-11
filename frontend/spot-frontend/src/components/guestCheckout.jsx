import React from 'react';
import { Table, Space } from 'antd';
import { withRouter } from "react-router";

class GuestCheckout extends React.Component{
    
    render(){

        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <a data-id={record.name} onClick={() => { this.props.history.push({
                                                            pathname: '/payment',
                                                            data: record.name
                                                          }) }}>{record.name}</a>
                </Space>
              ),
            },
          ];
          
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
          
          
        
        return (
            <Table dataSource={data} columns={columns} />
        )
    }
}


export default withRouter(GuestCheckout); 
