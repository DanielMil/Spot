import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';


//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';
import GuestCheckout from '../components/guestCheckout';

const { Footer, Content } = Layout;
const GuestCheckoutPage =() => {

    return (
        <Layout>
            <Layout>
                <SiteHeader/>
            </Layout>
            <Layout>    
                    <SiderMenu />
                <Layout>
                    <GuestCheckout/>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default GuestCheckoutPage;