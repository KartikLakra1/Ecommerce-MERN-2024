import React, { useState } from "react";
import './Header.css'
import { NavLink, Link } from "react-router-dom"
import { IoLogoIonitron } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCrossMark } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../Context/Auth";

const Header = () => {

    const [click, setClick] = useState(false);
    const [profile, setProfile] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [auth, setAuth] = useAuth();

    const handleClick = () => {
        setClick(!click);
    }

    const handleProfile = () => {
        setProfile(!profile);
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem('auth')
    }


    return (
        <div className="navigation-main">

            <div className={toggle ? "main-header toggle-true" : "main-header"}>


                <div className="header-logo">
                    <IoLogoIonitron className="icon-Logo" size={30} />
                    <h1><NavLink className="link-color" to={"/"}>Dante</NavLink></h1>
                </div>


                <ul className="navlink-list">
                    <li><NavLink className="link-color" to={"/"}>HOME</NavLink></li>


                    <li>
                        <div>
                            <NavLink className="link-color" to={"/category"}>CATEGORY</NavLink>

                            <span style={{ cursor: 'pointer' }} onClick={handleClick}>
                                {
                                    click ? (
                                        <MdOutlineKeyboardArrowUp size={15} />) : (<IoIosArrowDown size={15} />)
                                }
                            </span>

                        </div>
                        <div className={click ? ("header-category-navbar") : ("hidden-content")}>
                            <p className="header-profile-navbar-item">PRODUCT 1</p>
                            <p className="header-profile-navbar-item">PRODUCT 2</p>
                            <p className="header-profile-navbar-item">PRODUCT 3</p>

                        </div>
                    </li>


                    <li><NavLink className="link-color" to={"/about"}>ABOUT</NavLink></li>

                </ul>


                <ul className="cartAndProfile-list">
                    <li><NavLink className="link-color" to={"/cart"}>
                        <CiShoppingCart size={30} />
                    </NavLink>
                        {0}</li>


                    <li><CgProfile size={30} style={{ cursor: 'pointer' }} onClick={handleProfile} />
                        <div className={profile ? ("header-profile-navbar") : ("hidden-content")}>
                            {
                                !auth.user ? (<p className="header-profile-navbar-item"><Link to={"/login"} className="link-color-toggle">Login</Link></p>) : (<p className="header-profile-navbar-item"><Link to={"/login"} className="link-color-toggle" onClick={handleLogout}>Logout</Link></p>)
                            }

                            <p className="header-profile-navbar-item">New Products</p>
                        </div>
                    </li>
                </ul>

            </div>





            <div className="toggle-button" onClick={handleToggle}>
                {
                    toggle ? (
                        <GiCrossMark style={{ color: "#000" }} size={30} />
                    ) : (
                        <GiHamburgerMenu style={{ color: "#000" }} size={30} />
                    )
                }
            </div>


        </div>

    )
};

export default Header;
