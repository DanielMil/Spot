import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import UserServices from "../components/userServices";

//components
import SiderMenu from "../components/siderMenu";
import SiteHeader from "../components/siteHeader";

const UserServicesManagement = () => {
  return (
    <Layout>
      <Layout>
        <SiteHeader />
      </Layout>
      <Layout>
        <SiderMenu />
        <Layout>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserServices />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default UserServicesManagement;
