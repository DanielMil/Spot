import React from 'react';
import { Button , Divider } from 'antd';
import { withRouter } from "react-router";


class ManagerDashContent extends React.Component{

    constructor(props) {
        super(props)
        this.state ={
            loggedin: false
        }

        this.loginCheck();
    }

    loginCheck = async (credentials) => {
    
        let session_token = sessionStorage.getItem("session_token");
        let options = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: session_token,
            },
        };
        let response = await fetch('http://localhost:5000/auth/user', options).then((res) => res.json());
        if (response.status==="Success"){
            let loggedin = true
            this.setState({loggedin})
        }
      
    }

    handleLotreg = e => {
        this.props.history.push("/managelots")
    }
    handleNewpass = e => {
        this.props.history.push("/managerpassmanagement")
    }
    handleInfo = e => {
        this.props.history.push("/viewlotinfo")
    }
    render(){
        if(this.state.loggedin){
            return(
                <>  
                    <p>
                        Register a new parking lot with your account
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleLotreg}>
                        Register New Lot
                    </Button>
                    <Divider />
                    <p>
                        Register a new parking pass with an existing parking lot
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleNewpass}>
                        Register Parking Pass
                    </Button>
                    <Divider />
                    <p>
                        View/Edit existing parking lots
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleInfo}>
                        View Lot Information
                    </Button>
                </>
            );
        }
        return(
            <h2>Log in failed</h2>
        );
    }
}


export default withRouter(ManagerDashContent); 
