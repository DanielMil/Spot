import React from 'react';
import { Button , Divider } from 'antd';
import { withRouter } from "react-router";


class ManagerDashContent extends React.Component{
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
        //if (this.state.user){
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
        //}
        /**return(
            <h2>Log in failed</h2>
        );**/
    }
}


export default withRouter(ManagerDashContent); 
