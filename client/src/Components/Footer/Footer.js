import React from "react";
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="main-footer">
            <h1>All Right Reserved &copy; Dante</h1>
            <div className="items">
                <Link to={"/about"} className="link-color-toggle">About</Link>
                <Link to={"/contact"} className="link-color-toggle" >Contact</Link>
                <Link to={"/Policy"} className="link-color-toggle">Policies</Link>
            </div>
        </div>
    )
};

export default Footer;
