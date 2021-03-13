import React from 'react';
import { withRouter } from "react-router";
import { Input, InputNumber } from 'antd';
import { Form, Space, DatePicker, Button, Divider } from 'antd';


class ManagerRegisterParkingPass extends React.Component{
    
    handleSubmit =async e => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: this.price,
                clearance_level: this.clearancelevel,
                num_available: this.quantity,
                num_purchased: 0,
                expiration: this.expDate.format('YYYY-MM-DD'),
                acquisition: "2020-04-11"
            })
        }
    
        let response = await fetch('http://localhost:5000/pass/', options).then(res => res.json())
    
        console.log(response);
    };

    render(){    
        
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
            
        return(
            <>
            <Space direction="vertical">
                <h2>
                    Please Enter the parking pass attributes
                </h2>
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                    <p>
                        Clearance Level
                    </p> 

                    <Space size="middle">
                    <InputNumber
                        style={{
                            width: 200,
                          }}
                          defaultValue="1"
                          min="0"
                          max="10"
                          step="0.01"
                          onChange={e => this.price = e.target.value}
                          stringMode
                    />  
                  </Space>
                    
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
                    <DatePicker onChange={e => this.expDate = e.target.value} placeholder='Expiration Date'/>
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
