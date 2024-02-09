import React from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";

const Profile = () => {
    return (
        <Layout>
            <div className="adminDashboard-container">
                <UserMenu />
                <div className="content-container">
                    <div className="card">
                        <h1>Profile</h1>
                    </div>
                </div>

            </div>

        </Layout>
    );
};

export default Profile;