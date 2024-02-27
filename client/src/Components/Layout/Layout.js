import React from "react";
import Header from '../Header/Header'
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '80vh' }} >
                {props.children}
            </main>
            <Footer />
        </div>
    )
};

export default Layout;
