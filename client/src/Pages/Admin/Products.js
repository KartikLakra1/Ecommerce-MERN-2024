import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";


const Products = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getallProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);

        } catch (error) {
            console.log(error);
            alert('Something went wrong in getting all the products', error);
        }
    }

    // lifeCycle method
    useEffect(() => {
        getallProducts();
    }, [])

    return (
        <Layout>
            <div className="adminDashboard-container">
                <AdminMenu />
                <div>
                    <h1>All Products List</h1>
                    {
                        products?.map(p => (
                            <div key={p._id}>
                                <img src={p.photo} alt={p.name} />
                                <h3>{p.name}</h3>
                                <p>{p.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>


        </Layout>

    )
};

export default Products;
