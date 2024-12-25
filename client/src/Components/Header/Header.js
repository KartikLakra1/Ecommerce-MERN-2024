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
import SearchInput from "../Form/SearchInput";
import useCategory from './../../Hooks/useCategory';
import { useCart } from "../../Context/Cart";


const Header = () => {

    const [click, setClick] = useState(false);
    const [profile, setProfile] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart] = useCart();

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
        <div className="navigation-main z-40">

            <div className={toggle ? "main-header toggle-true" : "main-header"}>


                <div className="header-logo">
                    <IoLogoIonitron className="icon-Logo" size={10} />
                    <h1><NavLink className="link-color-toggle lg:text-4xl md:text-3xl text-4xl w-fit font-bold" to={"/"}>LOGO</NavLink></h1>
                </div>


                <ul className="navlink-list">
                    <SearchInput />
                    <li><NavLink className="link-color-toggle" to={"/"}>HOME</NavLink></li>


                    <li>
                        <div className="flex">
                            <NavLink className="link-color-toggle" to={"/categories"}>CATEGORY</NavLink>

                            <span style={{ cursor: 'pointer' }} onClick={handleClick}>
                                {
                                    click ? (
                                        <MdOutlineKeyboardArrowUp size={15} />) : (<IoIosArrowDown size={15} />)
                                }
                            </span>

                        </div>
                         
                    </li>




                </ul>


                <ul className="cartAndProfile-list">
                    <li className="relative"><NavLink className="link-color-toggle" to={"/cart"}>
                        <CiShoppingCart size={30} />
                    </NavLink>
                        {cart?.length > 0 ? <div className="bg-yellow-300 text-black p-1 rounded-3xl absolute bottom-4 pl-1 pr-1 right-0 font-bold">{cart.length}</div> : <></>}
                    </li>


                    <li>
                        {
                            !auth.user ? (< CgProfile size={30} style={{ cursor: 'pointer' }} onClick={handleProfile} />)
                                :
                                (
                                    <div className="username">
                                        <h1 style={{ cursor: 'pointer' }} onClick={handleProfile} >
                                            {
                                                auth?.user?.name
                                            }
                                        </h1>

                                        <span style={{ cursor: 'pointer' }} onClick={handleProfile}>
                                            {
                                                profile ? (
                                                    <MdOutlineKeyboardArrowUp size={15} />) : (<IoIosArrowDown size={15} />)
                                            }
                                        </span>


                                    </div>




                                )
                        }

                        <div className={profile ? ("header-profile-navbar") : ("hidden-content")}>
                            {
                                !auth.user ? (<p className="header-profile-navbar-item"><Link to={"/login"} className="link-color-toggle">Login</Link></p>) :

                                    (<div>

                                        <p className="header-profile-navbar-item"><Link to={"/login"} className="link-color-toggle" onClick={handleLogout}>Logout</Link></p>

                                        <p className="header-profile-navbar-item"><Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="link-color-toggle" >Dashboard</Link></p>
                                    </div>

                                    )
                            }
                        </div>
                    </li>
                </ul>

            </div>





            <div className="toggle-button" onClick={handleToggle}>
                {
                    toggle ? (
                        <GiCrossMark style={{ color: "#fff" }} size={30} />
                    ) : (
                        <GiHamburgerMenu style={{ color: "#fff" }} size={30} />
                    )
                }
            </div>


        </div>

    )
};

export default Header;
