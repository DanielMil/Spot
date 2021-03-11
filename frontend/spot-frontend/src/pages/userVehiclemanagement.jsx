import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import UserVehicles from "../components/userVehicles";

//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';

const { Footer, Content } = Layout;
const UserVehicleManagement =() => {

    return (
        <Layout>
            <Layout>
                <SiteHeader/>
            </Layout>
            <Layout>    
                    <SiderMenu />
                <Layout>
                    <UserVehicles />   
                </Layout>
            </Layout>
        </Layout>
    );

};
export default UserVehicleManagement;