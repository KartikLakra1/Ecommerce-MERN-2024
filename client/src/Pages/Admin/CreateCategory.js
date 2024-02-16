import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from 'axios';
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/Auth";
import { Modal } from 'antd';


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [visible, setvisible] = useState(false);
    const [name, setName] = useState("");
    const [auth, setAuth] = useAuth();
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");



    // create new category
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name }, {
                headers: {
                    "Authorization": auth?.token
                }
            });
            if (data?.success) {
                alert(`${name} is created`)
                getAllCategory();
                setName("");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong in input form")
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data.success) {
                setCategories(data.category);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong in getting category");
        }
    };

    // delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pid}`,
                {
                    headers: {
                        "Authorization": auth?.token
                    }
                }
            )

            if (data.success) {
                alert("category deleted successfully");
                getAllCategory();
            } else {
                alert("error in deletion of category");
            }

        } catch (error) {
            console.log(error);
            alert("error in deletion of category");
        }
    }



    useEffect(() => {
        getAllCategory();
    }, [])

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`, { name: updatedName },
                {
                    headers: {
                        "Authorization": auth?.token
                    }
                }
            )
            if (data.success) {
                alert(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setvisible(false);
                getAllCategory();
            } else {
                alert(data.messaage);
            }

        } catch (error) {
            alert("Something went wrong")
        }
    }

    return (

        <Layout>
            <div className="adminDashboard-container">
                <div className="admin-menu-container">
                    <AdminMenu />
                </div>

                <div className="content-container">
                    <div className="card">
                        <h1>Manage Category</h1>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        <table>
                            <tr>
                                <th>NAME </th>
                                <th>ACTION </th>

                            </tr>
                            {
                                categories?.map((c) => (
                                    <tr>
                                        <td key={c._id}> {c.name}</td>

                                        <td><button className="btn " onClick={() => { setvisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                            <button className="btn " onClick={() => { handleDelete(c._id) }}>Delete</button></td>
                                    </tr>

                                ))
                            }

                        </table>
                        <Modal onCancel={() => setvisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>

                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default CreateCategory;
