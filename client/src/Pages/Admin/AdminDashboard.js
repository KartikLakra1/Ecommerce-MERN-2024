import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import './AdminDashboard.css'
import { useAuth } from "../../Context/Auth";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="adminDashboard-container">

                <AdminMenu />


                <div className="content-container">
                    <div className="card">
                        <h3>Admin Name : {auth?.user?.name}</h3>
                        <h3>Admin Email : {auth?.user?.email}</h3>
                        <h3>Admin Contact : {auth?.user?.phone}</h3>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default AdminDashboard;
