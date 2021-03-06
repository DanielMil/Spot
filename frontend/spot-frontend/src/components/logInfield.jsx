import React from 'react';
import { Form, Input, InputNumber, Button, Space} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios'


class LogInField extends React.Component{
    handleSubmit = e => {
      const data = {
          email : this.email,
          pwd : this.pass

      }
      console.log(data);

      axios.post('login', data).then(
          res => {
              localStorage.setItem('token', res.data.token);
              this.props.history.push("/dashboard")
          }
      ).catch(
          err => {
              console.log(err);
          }
      )
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


export default LogInField; 
