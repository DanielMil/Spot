import React from 'react';
import { withRouter } from "react-router";
import { Table, Space, InputNumber } from 'antd';



class LotInformation extends React.Component{
    
    
    render(){
        function onChange(value) {
            console.log('changed', value);
        }
        const lotdata = [
            {
              parkinglot: 'Pearson Park and Fly',
              
            },
            
        ];
        
        const lotcolumns = [
            {
              title: 'Parking Lot',
              dataIndex: 'parkinglot',
              key: 'parkinglot',
            },
            {
              title: 'Available Spaces',
              dataIndex: 'avail_space',
              key: 'avail_space',
            },
            {
              title: 'Total Spaces',
              dataIndex: 'total_space',
              key: 'total_space',
            },
            {
                title: 'Rate',
                key: 'rate',
                render: (text, record) => (
                  <Space size="middle">
                    <InputNumber
                        style={{
                            width: 200,
                          }}
                          defaultValue="1"
                          min="0"
                          max="10"
                          step="0.01"
                          onChange={onChange}
                          stringMode
                    />  
                  </Space>
                ),
            }
        ];
        return(
            <Table dataSource={lotdata} columns={lotcolumns} />
        );
    }
}


export default withRouter(LotInformation); 
