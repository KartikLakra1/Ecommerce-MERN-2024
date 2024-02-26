import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";


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
                    <h1 className="text-2xl underline font-semibold text-center">All Products List</h1>
                    <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                        {
                            products?.map(p => (
                                <div key={p._id} className="grid items-center justify-center">
                                    <Link to={`/dashboard/admin/product/${p.slug}`} className="items-center justify-center grid">
                                        <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center max-w-72 h-fit">
                                            <div className="flex items-center justify-center p-3">
                                                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-48 h-auto text-center" />
                                            </div>

                                            <h3 className="p-2 text-red-800">{p.name}</h3>
                                            <p>{p.description}</p>

                                        </div>
                                    </Link>
                                </div>

                            ))
                        }

                    </div>

                </div>
            </div>


        </Layout>

    )
};

export default Products;
