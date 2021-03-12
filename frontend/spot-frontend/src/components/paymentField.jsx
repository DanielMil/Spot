import React from 'react';
import { withRouter } from "react-router";
import { Button, List } from 'antd';
import Layout from 'antd/lib/layout/layout';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import { fixControlledValue } from 'antd/lib/input/Input';

class PaymentField extends React.Component{
    handleSubmit = e => {
      this.props.history.push("/");
    };
    
    
    render(){
        //open source 
        const CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4",
                },
                },
                invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
                },
            },
        };

        //open source dummy key
        const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

        const data = [
            'Lot Used:' ,
            'Lot Rate: ',
            'Time Entered: ',
            'Time Left: '
          ];

        return (
            <Layout>
                <List
                    size="small"
                    header={<p>{this.props.location.data}</p>}
                    footer={<div><b>Total Due:</b></div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                
                <Elements stripe={stripePromise}>
                    <label>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </label>
                </Elements>
                
                <div style={{paddingTop: '25px'}}>
                    <button style={{float: 'right'}} type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
            </Layout>
        )
    }
}


export default withRouter(PaymentField);
