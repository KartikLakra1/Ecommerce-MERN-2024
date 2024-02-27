import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CategoryProducts = () => {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.slug) getProductsByCAT();
    }, [params.slug])

    const getProductsByCAT = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProduct(data?.products);
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <Layout>
            <div>
                <div>
                    <h1 className="text-center">{category.name}</h1>
                    <h1 className="text-center">{products.length} result found</h1>
                </div>

                <div className="grid justify-around items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                    {
                        products?.map(p => (
                            <div key={p._id} className="grid items-center justify-center">
                                <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center max-w-72 h-fit">
                                    <div className="flex items-center justify-center p-3">
                                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-48 h-auto text-center" />
                                    </div>

                                    <h3 className="p-2 text-red-800">{p.name}</h3>
                                    <p>{p.description.substring(0.30)}</p>
                                    <p className="font-bold text-left pl-4">$ {p.price}</p>
                                    <button className="bg-slate-600 text-white p-2 my-1 font-semibold" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="bg-orange-700 text-yellow-100 p-2 ">Add to Cart</button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </Layout>

    )
};

export default CategoryProducts;
