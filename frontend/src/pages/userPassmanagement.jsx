import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import UserPasses from "../components/userPasses";


//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';

const UserPassManagement =() => {

    return (
        <Layout>
            <Layout>
                <SiteHeader/>
            </Layout>
            <Layout>    
                    <SiderMenu />
                <Layout>
                   <UserPasses />  
                </Layout>
            </Layout>
        </Layout>
    );

};
export default UserPassManagement;