import React from 'react';
import { withRouter } from "react-router";
import { Input, AutoComplete } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { Form, Space, DatePicker, Button, Divider } from 'antd';


class ManagerRegisterParkingPass extends React.Component{
    
    handleSubmit = e => {
        
    };
    render(){    
        const renderTitle = (title) => (
            <span>
                {title}
                
            </span>
        );
            
        const renderItem = (title, count) => ({
            value: title,
            label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >  
                {title}
                <span>
                    <DollarCircleOutlined /> {count}
                </span>
            </div>
            ),
        });
            
        const options = [
            {
            label: renderTitle('Registered Parking Lots'),
            options: [renderItem('Pearson Intl', 'max'), renderItem('Hospital', 'max')],
            },
            
        ];

        const layout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 10,
            },
          };
          const validateMessages = {
            required: '${label} is required!',
            types: {
              email: '${label} is not a valid email!',
              number: '${label} is not a valid number!',
            },
            number: {
              range: '${label} must be between ${min} and ${max}',
            },
        };
            
        const Complete = () => (
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 250 }}
                options={options}
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
        );   
        
        
       
            
        return(
            <>
            <Space direction="vertical">
                <h2>
                    Select the parking lot you would like to register a new pass to    
                </h2>
                <Complete />
                <Divider />
                <h2>
                    Please Enter the parking pass attributes
                </h2>
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                    <p>
                        Clearance Level
                    </p> 
                    
                    <Form.Item
                        name={['user', 'clearancelevel']}
                        label=""
                        rules={[
                            {
                            required:true,
                            type: 'number',
                            },
                        ]}
                        
                    >
                        <Input onChange={e => this.clearancelevel = e.target.value}/>
                    </Form.Item>
                    <p>
                        Total Quantity Available
                    </p>    
                    <Form.Item
                        name={['user', 'quantity']}
                        label=""
                        rules={[
                            {
                            required:true,
                            type: 'number',
                            },
                        ]}
                        
                    >
                        <Input onChange={e => this.quantity = e.target.value}/>
                    </Form.Item>
                    <DatePicker placeholder='Expiration Date'/>
                    <Divider />
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}> 
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                
                
            </Space>
            </>
        );
    }
}


export default withRouter(ManagerRegisterParkingPass); 
