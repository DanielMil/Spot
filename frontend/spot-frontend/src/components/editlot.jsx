import React from 'react';
import { Form, Input, InputNumber, Button, AutoComplete, Divider} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";


class EditLot extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
          passes: [],
          capacity: 0,
          rate: 0,
          address: "",
          passlevel: 0,
          pass: ""
        }
  
        this.getLot(this.props.location.state[0]);
        this.lotid = this.props.location.state[0];
        this.getPass(this.props.location.state[1]);
        this.getPasses();
    }

    async getLot (id) {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        let response = await fetch('http://localhost:5000/lot/get/' + id, options).then((res) => res.json());
        this.state.capacity = response.info.max_capacity;
        this.state.rate = response.info.rate;
        this.state.passlevel = response.info.allowable_pass_level;
        this.state.address = response.info.address;
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

    getPass = async (id) => {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        let response = await fetch('http://localhost:5000/pass/passById/' + id, options).then((res) => res.json());
        this.state.pass = response.info.name;
      }

    handleSubmit = async () => {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };

        let response = await fetch('http://localhost:5000/pass/passByName/' + this.state.pass, options).then((res) => res.json());
        const newPassId = response.info[0].id;

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

        console.log(response.info.id, this.state.capacity, this.state.rate, this.state.address, this.state.passlevel, newPassId)

        options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: response.info.id,
                maxCapacity: this.state.capacity,
                rate: this.state.rate,
                address: this.state.address,
                allowablePassLevel: this.state.passlevel,
                passId: newPassId,
                lotId: this.lotid
            })
        }
    
        response = await fetch('http://localhost:5000/lot/', options).then(res => res.json());
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
                value={this.state.pass}
                onChange={(value)=>  {this.setState({pass:value})}}
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
                    <InputNumber value={this.state.capacity} onChange={(value)=>  {this.setState({capacity:value})}}/>
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
                        value={this.state.rate}
                        onChange={(value)=>  {this.setState({rate:value})}}
                        stringMode/>
                </Form.Item>

                <Form.Item
                    label="Address"
                    rules={[
                        {
                        required:true,
                        
                        },
                    ]}
                    
                >
                    <Input value={this.state.address} type="text" onChange={(value)=>  {this.setState({address:value.target.value})}}/>
                </Form.Item>

                <Form.Item
                    label="Allowable Pass Level"
                >
                    <InputNumber value={this.state.passlevel} onChange={(value)=>  {this.setState({passlevel:value})}}/>
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


export default withRouter(EditLot); 
