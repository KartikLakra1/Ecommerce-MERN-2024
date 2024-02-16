import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { Select } from 'antd';
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setcategory] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [quantity, setquantity] = useState("");
    const [shipping, setshipping] = useState("");
    const [photo, setphoto] = useState("");

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])



    return (
        <Layout>
            <div className="adminDashboard-container">
                <AdminMenu />
                <div className="content-container">
                    <div className="card">
                        <h1>Create Products</h1>
                        <div>
                            <Select bordered={false} placeholder="Select a category" style={{ marginBottom: "15px" }} size="large" showSearch onChange={(value) => { setcategory(value) }}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c.name}>
                                        {c.name}
                                    </Option>
                                ))}

                            </Select>

                            <div style={{ marginBottom: "15px" }}>
                                <label>
                                    {
                                        photo ? photo.name : "Upload photo"
                                    }
                                    <input type="file" name="photo" accept="images/*" onChange={(e) => setphoto(e.target.files[0])} hidden />
                                </label>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default CreateProduct;
