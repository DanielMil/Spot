import React from 'react';
import { withRouter } from "react-router";
import { Table } from 'antd';
import Layout from 'antd/lib/layout/layout';

class PaymentField extends React.Component{
    handleSubmit = e => {
      const data = {
          plate : this.plate

      }
      console.log(data);

      this.props.history.push("/dashboard");

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
        
        return (
            <Layout>
                <p>{this.props.location.data}</p>
            </Layout>
        )
    }
}


export default withRouter(PaymentField); 