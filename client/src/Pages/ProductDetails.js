import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProduct] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart()

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params.slug])

    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product?.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    // get similar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="flex items-center flex-col justify-center gap-6 w-[100%] lg:p-11 p-3 pt-5 pb-5 bg-gradient-to-tr from-slate-950 to-slate-900" >
                <div className="flex flex-col justify-around items-center lg:flex-row lg:w-[60%] w-[90%] shadow-2xl lg:h-[60vh] h-fit p-3 bg-white">
                    <div className=" lg:basis-[50%] h-full p-2">
                        <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className="flex justify-center items-center h-full w-auto text-center" /></div>
                    <div className="lg:basis-[50%] flex flex-col items-start justify-start pl-4 pr-4 h-full pt-16">

                        <div className="w-full flex flex-col items-start justify-center bg-slate-300 p-2">
                            <h1 className="text-3xl font-bold mb-8">Product Details</h1>
                            <h4><span className="text-red-500 font-2xl">Name : </span>{product.name}</h4>
                            <h4><span className="text-red-500 font-2xl">Description : </span>{product.description}</h4>
                            <h4><span className="text-red-500 font-2xl">Price : </span>{product.price}</h4>
                            <h4><span className="text-red-500 font-2xl">Category: </span>{product?.category?.name}</h4>


                        </div>



                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <h1 className="text-3xl underline font-bold text-white ">Similar Products</h1>
                    {relatedProducts.length < 1 && (<p className="text-red-500 text-xl">No Similar Products Found</p>)}
                    <div className="grid justify-around items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                        {
                            relatedProducts?.map(p => (
                                <div key={p._id} className="grid items-center justify-center bg-white">
                                    <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center max-w-72 h-fit">
                                        <div className="flex items-center justify-center p-3">
                                            <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-48 h-auto text-center" />
                                        </div>

                                        <h3 className="p-2 text-red-800">{p.name}</h3>
                                        <p>{p.description.substring(0.30)}</p>
                                        <p className="font-bold text-left pl-4">$ {p.price}</p>
                                        <button className="bg-slate-600 text-white p-2 my-1 font-semibold" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className="bg-orange-700 text-yellow-100 p-2" onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            alert("item added to cart successfully");
                                        }}>Add to Cart</button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>
                </div>
            </div>

        </Layout>
    )
};

export default ProductDetails;
