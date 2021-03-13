import React from 'react';
import { Form, Input, Button, AutoComplete, Divider} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";


class RegisterLot extends React.Component{
    handleSubmit = async e => {
        let session_token = sessionStorage.getItem("session_token");
        let options = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: session_token,
            },
        };

        let response = await fetch('http://localhost:5000/user/', options).then((res) => res.json());
        
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner_id: response.info.id,
                max_capacity: this.maxcap,
                curr_capacity: this.mincap,
                rate: this.rate,
                address: this.address,
                allowable_pass_level: this.allowablePassLevel
            })
        }
    
        response = await fetch('http://localhost:5000/lot/', options).then(res => res.json())
    
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
        
        return (
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                <h2>
                    Select the parking lot you would like to register a new pass to    
                </h2>
                <Complete />
                <Divider />

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
