import React from "react";
import { NavLink } from "react-router-dom";
import './AdminMenu.css';

const AdminMenu = () => {
    return (
        <>
            <div className="Admin-panel-category">
                <h1>Admin panel</h1>
                <ul className="Admin-panel-category-list">
                    <li className="admin-panel-list-items"><NavLink to={"/dashboard/admin/create-category"}>Create Category</NavLink></li>
                    <li className="admin-panel-list-items"><NavLink to={"/dashboard/admin/create-product"}>Create Product</NavLink></li>
                    <li className="admin-panel-list-items"><NavLink to={"/dashboard/admin/products"}>Products</NavLink></li>
                    <li className="admin-panel-list-items"><NavLink to={"/dashboard/admin/users"}>Users</NavLink></li>
                </ul>
            </div>

        </>




    )
};

export default AdminMenu;
