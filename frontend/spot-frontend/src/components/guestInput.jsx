import React from 'react';
import { Form, Input, Button} from 'antd';
import { withRouter } from "react-router";

class GuestInput extends React.Component{
    handleSubmit = e => {
      const data = {
          plate : this.plate

      }
      console.log(data);

      this.props.history.push("/guestcheckout")

    //   axios.post('login', data).then(
    //       res => {
    //           localStorage.setItem('token', res.data.token);
    //           this.props.history.push("/dashboard")
    //       }
    //   ).catch(
    //       err => {
    //           console.log(err);
    //       }
    //   )
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
              plate: '${label} is not a valid plate!',
            }
          };
        
        return (
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                <Form.Item
                    name={['plate']}
                    label="Plate"
                    rules={[
                        {
                        required:true
                        },
                    ]}
                >
                    <Input onChange={e => this.plate = e.target.value}/>
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


export default withRouter(GuestInput); 