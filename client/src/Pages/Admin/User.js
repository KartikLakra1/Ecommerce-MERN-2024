import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const User = () => {
    return (
        <Layout>
            <div className="adminDashboard-container">
                <AdminMenu />
                <div className="content-container">
                    <div className="card">
                        <h1>Users</h1>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default User;
