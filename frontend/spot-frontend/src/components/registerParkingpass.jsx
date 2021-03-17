import React from 'react';
import { withRouter } from "react-router";
import { Input, InputNumber } from 'antd';
import { Form, Space, DatePicker, Button, Divider } from 'antd';


class ManagerRegisterParkingPass extends React.Component{
    formRef = React.createRef();
    handleSubmit = async () => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: this.price,
                clearanceLevel: this.clearancelevel,
                numAvailable: this.quantity,
                expiration: this.expDate.format('YYYY-MM-DD'),
                acquisition: "2020-04-11",
                name: this.name
            })
        }
    
        let response = await fetch('http://localhost:5000/pass/', options).then(res => res.json())
    
        console.log(response);
        this.formRef.current.resetFields();
        this.props.history.push("/managerdashboard");
        
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
                <p>Name</p>
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages} ref={this.formRef} name="control-ref">    
                
                    <Form.Item>
                        <Input onChange={e => this.name = e.target.value}/>
                    </Form.Item>
                    <p>Price</p>
                    <InputNumber
                        style={{
                            width: 200,
                        }}
                        min="0"
                        step="0.01"
                        onChange={value => this.price = value}
                        stringMode
                    />  
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
                        <InputNumber min={1} max={10} onChange={value => this.clearancelevel = value}/>
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
                        <InputNumber min={1} onChange={value => this.quantity = value} />
                    </Form.Item>
                        <DatePicker onChange={value => this.expDate = value} placeholder='Expiration Date'/>
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
