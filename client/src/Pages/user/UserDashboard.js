import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/Auth";
import './userDashboard.css'

const UserDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="adminDashboard-container">
                <div className="admin-menu-container">
                    <UserMenu />
                </div>

                <div className="content-container">
                    <div className="card">
                        <h3>User Name : {auth?.user?.name}</h3>
                        <h3>User Email : {auth?.user?.email}</h3>
                        <h3>User Contact : {auth?.user?.phone}</h3>
                        <h3>User Address : {auth?.user?.address}</h3>
                    </div>
                </div>

            </div>

        </Layout>
    );
};

export default UserDashboard;
