import React, { useState, useEffect } from "react";
import Layout from './../../Components/Layout/Layout';
import axios from 'axios';
import { Button, Checkbox, Radio } from 'antd';
import { Prices } from "../../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../Context/Cart';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


const Home = () => {


    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [check, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [laoding, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useCart()

    useEffect(() => {
        if (page == 1) return;
        loadMore()
    }, [page])

    // load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // filter by Category
    const handleFilter = (value, id) => {
        let all = [...check]
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, [])

    // get all products
    const getallProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (!check.length || !radio.length) getallProducts();

    }, [check.length, radio.length])

    useEffect(() => {
        if (check.length || radio.length) filteredProduct()
    }, [radio, check])


    // get filtered products
    const filteredProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { check, radio })
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }


    // getTotal count
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count');
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    }





    return (
        <Layout>
            <div className="w-[100%] h-fit pt-4 pb-2  bg-neutral-950">

                {/* <div className="w-full">
                    <img src={"/images/banner.png"} className="bg-cover bg-center w-full" />
                </div> */}

                <div className="flex mt-3 p-6 w-[100%] text-white">



                    <div className="basis-[20%] mr-4 text-white">
                        <div>
                            <h4 className="text-center">Filter By Category</h4>
                            <div className="flex items-start justify-start flex-col p-3 bg-slate-500 gap-3 font-bold text-white">
                                {
                                    categories?.map(c => (
                                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                            <span className="text-white">{c.name}</span>

                                        </Checkbox>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-center">Filter By Price</h4>
                            <div className="flex items-start justify-start flex-col p-3 bg-slate-500 gap-3 text-white">
                                <Radio.Group onChange={e => setRadio(e.target.value)}>
                                    {
                                        Prices?.map(p => (
                                            <div key={p._id} className="mt-1">
                                                <Radio value={p.array}>
                                                    <span className="text-white font-bold">{p.name}</span>
                                                </Radio>
                                            </div>

                                        ))
                                    }
                                </Radio.Group>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button className="bg-red-700 text-white font-medium hover:bg-red-500" onClick={() => window.location.reload()}>Reset Filters</Button>
                        </div>

                    </div>
                    <div className="basis-[80%] text-black ">
                        <h1 className="text-center w-full lg:text-4xl ">All Products</h1>
                        <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:p-4" >
                            {
                                products?.map(p => (
                                    <div key={p._id} className="grid items-center justify-center ">
                                        <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center max-w-full h-fit bg-white">
                                            <div className="flex items-center justify-center p-3">
                                                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-96 h-24 text-center" />
                                            </div>

                                            <h3 className="p-2 text-red-800">{p.name.substring(0, 10)}</h3>
                                            <p>{p.description.substring(0, 30)}...</p>
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
                        <div className="m-2 p-3">
                            {
                                products && products.length < total && (
                                    <button className="border-black bg-yellow-300 text-black p-2 rounded-xl font-semibold" onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}>
                                        {laoding ? "loading..." : "Loadmore"}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Home;
