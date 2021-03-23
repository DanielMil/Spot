import React from 'react';
import { Form, Input, InputNumber, Button, Space} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { withRouter } from "react-router";


class LogInField extends React.Component{
    handleSubmit = async (credentials) => {
        let options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.email,
                password: this.pass,
            }),
        };
    
        let response = await fetch('http://localhost:5000/auth/login/', options).then((res) => res.json());
    
        if (response.status === "Success") {
            sessionStorage.setItem("session_token", response.info.token);

        }
        options = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: response.info.token,
            },
        };

        response = await fetch('http://localhost:5000/auth/user', options).then((res) => res.json());

        if (response.info.isOwner){
            this.props.history.push("/managerdashboard")
        }else{
            this.props.history.push("/userdashboard")
        }
        
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


export default withRouter(LogInField); 
