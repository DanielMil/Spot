import React from 'react';
import { Form, Input, InputNumber, Button, AutoComplete, Divider} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";


class RegisterLot extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
          passes: []
        }
  
        this.getPasses();
    }

    getPasses = async () => {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        let response = await fetch('http://localhost:5000/pass/', options).then((res) => res.json());
        this.state.passes = response.info;
        this.forceUpdate();
    }

    handleSubmit = async () => {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };

        let response = await fetch('http://localhost:5000/pass/passByName/' + this.passId, options).then((res) => res.json());
        const newPassId = response.info[0].id;
        console.log(newPassId)

        let session_token = sessionStorage.getItem("session_token");
        options = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: session_token,
            },
        };

        response = await fetch('http://localhost:5000/auth/user', options).then((res) => res.json());

        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: response.info.id,
                maxCapacity: this.maxcap,
                rate: this.rate,
                address: this.address,
                allowablePassLevel: this.allowablePassLevel,
                passId: newPassId,
            })
        }
    
        response = await fetch('http://localhost:5000/lot/', options).then(res => res.json())
    
        console.log(response);
        
    };

    getOptions() {
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

        let options = [
            {
                label: renderTitle('Passes'),
                options: [],
            }
        ];
        var i;
        for (i = 0; i < this.state.passes.length; i++) {
            options[0].options.push(renderItem(this.state.passes[i].name, this.state.passes[i].price));
        }

        console.log(this.state.passes)
        
        return options;
    }
    
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
                options={this.getOptions()}
                onChange={value => this.passId = value}
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
        );
        
        return (
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                <h2>
                    Select the pass you would like to register a new parking lot to    
                </h2>
                <Complete />
                <Divider />

                <Form.Item
                    label="Maximum Capacity"
                >
                    <InputNumber onChange={value => this.maxcap = value}/>
                </Form.Item>

                <Form.Item
                    label="Rate"
                >
                    <InputNumber 
                            style={{
                                width: 200,
                            }}
                            min="0"
                            step="0.01"
                            onChange={value => this.rate = value}
                            stringMode/>
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
                    label="Allowable Pass Level"
                >
                    <InputNumber onChange={e => this.allowablePassLevel = e}/>
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
