import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { Select } from 'antd';
import { useAuth } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
const { Option } = Select;


const CreateProduct = () => {
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setcategory] = useState("");
    const [name, setname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
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

    // create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("name", name);
            const { data } = await axios.post('/api/v1/product/create-product', productData, {
                headers: {
                    "Authorization": auth?.token
                }
            })
            if (data?.success) {
                alert("product created successfully");
                navigate('/dashboard/admin/products')
            } else {
                alert(data?.message)
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong in creating product")
        }
    }



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
                                    <Option key={c._id} value={c._id}>
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
                            <div style={{ marginBottom: "15px" }}>
                                {
                                    photo && (
                                        <div>
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} />
                                        </div>
                                    )
                                }

                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <input type="text" value={name} placeholder="write a name" onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <button className="btn" onClick={handleCreate}>CREATE PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default CreateProduct;
