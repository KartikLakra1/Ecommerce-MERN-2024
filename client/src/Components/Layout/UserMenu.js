import React from "react";
import { NavLink } from "react-router-dom";
import './AdminMenu.css';

const UserMenu = () => {
    return (
        <div className="Admin-panel-category">
            <h1>User panel</h1>
            <ul className="Admin-panel-category-list">
                <li className="admin-panel-list-items"><NavLink to={"/dashboard/user/profile"}>Profile</NavLink></li>
                <li className="admin-panel-list-items"><NavLink to={"/dashboard/user/orders"}>Orders</NavLink></li>

            </ul>
        </div>
    )
};

export default UserMenu;
