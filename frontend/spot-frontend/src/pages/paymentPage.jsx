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
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 768 }}>
                            <PaymentField/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright Spot</Footer>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default PaymentPage;