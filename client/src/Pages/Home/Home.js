import React, { useState, useEffect } from "react";
import "./Home.css"
import Layout from './../../Components/Layout/Layout';
import { useAuth } from "../../Context/Auth";
import axios from 'axios';

const Home = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // get all products
    const getallProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="text-center">Filter By Category</h4>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Home;
