import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';
import PaymentField from '../components/paymentField';

const { Footer, Content } = Layout;
const PaymentPage =() => {

    return (
        <Layout>
            <Layout>
                <SiteHeader/>
            </Layout>
            <Layout>    
                    <SiderMenu />
                <Layout>
                    <PaymentField/>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default PaymentPage;