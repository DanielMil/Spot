import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';


//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';
import GuestInput from '../components/guestInput'

const { Footer, Content } = Layout;
const GuestPage =() => {

    return (
        <Layout>
            <Layout>
                <SiteHeader/>
            </Layout>
            <Layout>    
                    <SiderMenu />
                <Layout>
                    <GuestInput/>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default GuestPage;