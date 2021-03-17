import React from 'react';
import { Form, Input, InputNumber, Button, AutoComplete, Divider, Space, DatePicker} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";
import moment from 'moment';


class EditPass extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
          name: "",
          price: 0,
          clearancelevel: 0,
          quantity: 0,
          expDate: ""
        }
  
        this.getPass(this.props.location.state);
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
        this.state.name = response.info.name;
        this.state.price = response.info.price;
        this.state.clearancelevel = response.info.clearance_level;
        this.state.quantity = response.info.num_available;
        this.state.expDate = response.info.expiration.substring(0, 10);
        console.log(this.state);
        this.forceUpdate();
    }

    handleSubmit = async () => {
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: this.state.price,
                clearanceLevel: this.state.clearancelevel,
                numAvailable: this.state.quantity,
                expiration: this.state.expDate,
                acquisition: "2020-04-11",
                name: this.state.name,
                passId: this.props.location.state
            })
        }
    
        let response = await fetch('http://localhost:5000/pass/', options).then(res => res.json());
        console.log(response);

        this.props.history.push("/viewlotinfo");
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
            <Space direction="vertical">
                <h2>
                    Please Enter the parking pass attributes
                </h2>
                <p>Name</p>
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages} ref={this.formRef} name="control-ref">    
                
                    <Form.Item>
                        <Input value={this.state.name} onChange={(value)=>  {this.setState({name:value})}}/>
                    </Form.Item>
                    <p>Price</p>
                    <InputNumber
                        style={{
                            width: 200,
                        }}
                        min="0"
                        step="0.01"
                        value={this.state.price}
                        onChange={(value)=>  {this.setState({price:value})}}
                        stringMode
                    />  
                    <p>
                        Clearance Level
                    </p> 
                    <Form.Item
                        label=""
                        rules={[
                            {
                            required:true,
                            type: 'number',
                            },
                        ]}
                        
                    >
                        <InputNumber value={this.state.clearancelevel} min={1} max={10} onChange={(value)=>  {this.setState({clearancelevel:value})}}/>
                    </Form.Item>
                    <p>
                        Total Quantity Available
                    </p>    
                    <Form.Item
                        label=""
                        rules={[
                            {
                            required:true,
                            type: 'number',
                            },
                        ]}
                        
                    >
                        <InputNumber value={this.state.quantity} min={1} onChange={(value)=>  {this.setState({quantity:value})}}/>
                    </Form.Item>
                        <input type="date" value={this.state.expDate} onChange={(e)=>  {this.setState({expDate: e.target.value})}} />
                        <Divider />
                    
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}> 
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                
                
            </Space>
        )
    }
}


export default withRouter(EditPass); 
