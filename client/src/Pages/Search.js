
import React from "react";
import { useSearch } from "../Context/Search";
import Layout from './../Components/Layout/Layout';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-center text-3xl">Search Results</h1>
                    <h4 className="text-center text-red-500 text-xl ">{values?.results.length < 1 ? 'No Products Found' : `Found : ${values?.results.length}`}</h4>
                </div>
                <div className="grid justify-around items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                    {
                        values?.results.map(p => (
                            <div key={p._id} className="grid items-center justify-center">
                                <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center max-w-72 h-fit">
                                    <div className="flex items-center justify-center p-3">
                                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-48 h-auto text-center" />
                                    </div>

                                    <h3 className="p-2 text-red-800">{p.name}</h3>
                                    <p>{p.description.substring(0.30)}</p>
                                    <p className="font-bold text-left pl-4">$ {p.price}</p>
                                    <button className="bg-slate-600 text-white p-2 my-1 font-semibold">More Details</button>
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

export default Search;
