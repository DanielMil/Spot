import React from 'react';
import { Form, Input, InputNumber, Button, Space} from 'antd';
import axios from 'axios'
import { withRouter } from "react-router";


class RegisterLot extends React.Component{
    handleSubmit = e => {
        const data = {
            maxcap : this.maxcap,
            mincap : this.mincap,
            rate : this.rate,
            address : this.address,
            passlevel : this.passlevel
        }
        
        /*console.log(this.props.history)
        axios.post('login', data).then(
            res => {
                localStorage.setItem('token', res.data.token);
                this.props.history.push("/dashboard")
            }
        ).catch(
            err => {
                console.log(err);
            }
        )*/
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
        
        return (
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>


                <Form.Item
                    name={['user', 'maxcap']}
                    label="Maximum Capacity"
                    rules={[
                        {
                        required:true,
                        type: 'number',
                        },
                    ]}
                    
                >
                    <Input onChange={e => this.maxcap = e.target.value}/>
                </Form.Item>

                <Form.Item
                    name={['user', 'mincap']}
                    label="Minimum Capacity"
                    rules={[
                        {
                        required:true,
                        type: 'number',
                        },
                    ]}
                    
                >
                    <Input onChange={e => this.mincap = e.target.value}/>
                </Form.Item>

                <Form.Item
                    name={['user', 'rate']}
                    label="Hourly Rate"
                    rules={[
                        {
                        required:true,
                        type: 'number',
                        },
                    ]}
                    
                >
                    <Input onChange={e => this.rate = e.target.value}/>
                </Form.Item>

                <Form.Item
                    name={['user', 'address']}
                    label="Address"
                    rules={[
                        {
                        required:true,
                        
                        },
                    ]}
                    
                >
                    <Input onChange={e => this.address = e.target.value}/>
                </Form.Item>

                <Form.Item
                    name={['user', 'passlevel']}
                    label="Allowable Pass Level"
                    rules={[
                        {
                        required:true,
                        type: 'number',
                        },
                    ]}
                    
                >
                    <Input onChange={e => this.passlevel = e.target.value}/>
                </Form.Item>
        
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}> 
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default withRouter(RegisterLot); 
