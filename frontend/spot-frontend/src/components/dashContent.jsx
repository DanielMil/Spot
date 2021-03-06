import React from 'react';
import axios from 'axios';


class DashContent extends React.Component{
    state = {};
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
    }
    
    render(){
        if (this.state.user){
            <h2>User Dash</h2>

        }
        return(
            <h2>Log in failed</h2>
        );
    }
}


export default DashContent; 
