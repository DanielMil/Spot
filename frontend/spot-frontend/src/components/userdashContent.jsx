import React from 'react';
import axios from 'axios';
import { Button , Divider } from 'antd';
import { withRouter } from "react-router";


class UserDashContent extends React.Component{
    /**state = {};
    componentDidMount(){
        axios.get('user').then(
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
        //if (this.state.user){
            return(
                <>  
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
                    <p>
                        Change your email, password, or view or cancel your active parking passes
                    </p>
                    <Button type="primary"  size="large" shape="round" onClick={this.handleServices}>
                        Manage Services
                    </Button>
                </>
            );
        //}
        /**return(
            <h2>Log in failed</h2>
        );**/
    }
}


export default withRouter(UserDashContent); 
