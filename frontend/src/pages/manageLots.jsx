import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';


//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';
import RegisterLot from '../components/registerLot';
const { Footer, Content } = Layout;
const ManageLots =() => {

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
                            <RegisterLot />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright DAN THE MAN</Footer>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default ManageLots;