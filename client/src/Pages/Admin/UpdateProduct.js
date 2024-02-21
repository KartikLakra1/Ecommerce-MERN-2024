import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { Select } from 'antd';
import { useAuth } from "../../Context/Auth";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;


const UpdateProduct = () => {
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const parmas = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setcategory] = useState("");
    const [name, setname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setphoto] = useState("");

    const [id, setid] = useState();

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${parmas.slug}`)
            setname(data.product.name);
            setid(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping)
            setcategory(data.product.category._id)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, [])


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
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("name", name);
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData, {
                headers: {
                    "Authorization": auth?.token
                }
            })
            if (data?.success) {
                alert("product Updated successfully successfully");
                navigate('/dashboard/admin/products')
            } else {
                alert(data?.message)
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong in updating product")
        }
    }


    // delete the product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure you want to delete this product ? ");
            if (!answer) return;

            const { data } = await axios.delete(`/api/v1/product//delete-product/${id}`);
            navigate('/dashboard/admin/products');

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className="adminDashboard-container">
                <AdminMenu />
                <div className="content-container">
                    <div className="card">
                        <h1>Update Products</h1>
                        <div>
                            <Select bordered={false} placeholder="Select a category" style={{ marginBottom: "15px" }} size="large" showSearch onChange={(value) => { setcategory(value) }} value={category}>
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
                                    photo ? (
                                        <div>
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} />
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
                                    value={shipping ? "yes" : "no"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <button className="btn" onClick={handleUpdate}>UPDATE PRODUCT</button>
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <button className="btn" onClick={handleDelete}>DELETE PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default UpdateProduct;
