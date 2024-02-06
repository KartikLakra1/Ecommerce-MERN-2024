import React from "react";
import "./Home.css"
import Layout from './../../Components/Layout/Layout';
import { useAuth } from "../../Context/Auth";

const Home = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <h1>Home</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
};

export default Home;
