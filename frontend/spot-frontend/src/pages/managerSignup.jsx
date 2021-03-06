import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';


//components
import SiderMenu from '../components/siderMenu';
import SiteHeader from '../components/siteHeader';
import NewUserField from "../components/newUserfield";

const { Footer, Content } = Layout;
const ManagerSignUp =() => {

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
                            <NewUserField/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright DAN THE MAN</Footer>
                </Layout>
            </Layout>
        </Layout>
    );

};
export default ManagerSignUp;