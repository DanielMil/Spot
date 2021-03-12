import React from 'react';
import { Form, Input, InputNumber, Button, Space} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from "react-router";



class NewUserField extends React.Component{
    
    handleSubmit = e => {
        axios.post('/register', {
            first_name : this.firstname,
            last_name : this.lastname,
            email : this.email,
            pwd : this.pass,
            isOwner: false
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}  >
{/* First Name Field*/}
                <Form.Item
                    name={['user', 'firstname']}
                    label="First Name"
                    rules={[
                    {
                    required: true,
                    },
                    ]}
                >
                    <Input onChange={e => this.firstname = e.target.value}/>
                </Form.Item>

{/* Last Name Field*/}
                <Form.Item
                    name={['user', 'lastname']}
                    label="Last Name"
                    rules={[
                    {
                    required: true,
                    },
                    ]}
                >
                    <Input onChange={e => this.lastname = e.target.value}/>
                </Form.Item>
        
{/* EMAIL Field*/}
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                        required:true,
                        type: 'email',
                        },
                    ]}
                >
                    <Input onChange={e => this.email = e.target.value}/>
                </Form.Item>

{/*Password Field*/}
                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                    {
                    required: true,
                    },
                    ]}
                >       
                    <Input.Password
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={e => this.pass = e.target.value}
                    />
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


export default withRouter(NewUserField); 
