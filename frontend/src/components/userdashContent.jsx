import React from 'react';
import { Button , Divider } from 'antd';
import { withRouter } from "react-router";


class UserDashContent extends React.Component{
    /**state = {};
    componentDidMount(){
        axios.get('auth/user').then(
            res => {
                this.setState({
                    user: res.data
                });
            },
            err => {
                console.log(err);
            } 
        )
    }**/
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
    handleVehicle = e => {
        this.props.history.push("/uservehiclemanagement")
        console.log('here')
    }
    handleNewpass = e => {
        this.props.history.push("/userpassmanagement")
    }
    handleServices = e => {
        this.props.history.push("/userservicesmanagement")
    }
    render(){
        if (this.state.loggedin){
            return(
                <>  
                    
                    <p>
                        Pay fees. Change your email, password, or view or cancel your active parking passes
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleServices}>
                        Manage Services
                    </Button>  
                    <Divider />             
                    <p>
                        View your currently registered vehicle or register a new one
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleVehicle}>
                        View/Register Vehicle
                    </Button>
                    <Divider />
                    <p>
                        Add a new parking pass to your Spot account
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleNewpass}>
                        Add new pass
                    </Button>
                    <Divider />
                </>
            );
        }
        return(
            <h2>Log in failed</h2>
        );
    }
}


export default withRouter(UserDashContent); 
