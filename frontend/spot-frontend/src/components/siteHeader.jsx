import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as Logo } from '../images/logo.svg';
import { Typography } from 'antd';
import { withRouter } from "react-router";



const { Header } = Layout;

class SiteHeader extends React.Component{
    
    
    render(){
        const bannerStyle = {
            background: 'white',
            height: 75
        };
        return(
            <Header 
            style={bannerStyle}
            >
                <svg viewBox="10 25 100 100" width="150">
                        <Logo />
                </svg>
            </Header>
        );
    }
}


export default withRouter(SiteHeader); 
