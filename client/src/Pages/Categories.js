import React from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../Hooks/useCategory";

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-center text-4xl underline mb-16">All Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-around items-center">
                    {
                        categories.map(c => (
                            <Link className="bg-blue-700 text-white p-5 text-center text-2xl rounded-2xl shadow-2xl hover:shadow-none" to={`/category/${c.slug}`}>{c.name}</Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
};

export default Categories;
