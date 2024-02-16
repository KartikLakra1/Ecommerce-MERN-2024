import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from 'axios';
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/Auth";


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [visible, setvisible] = useState(false);
    const [name, setName] = useState("");
    const [auth, setAuth] = useAuth()


    const handleVisibility = () => {
        setvisible(!visible);

    }

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



    useEffect(() => {
        getAllCategory();
    }, [])

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

                                        <td><button className="btn " onClick={handleVisibility}>Edit</button>
                                            <button className="btn " >Delete</button></td>
                                    </tr>

                                ))
                            }

                        </table>

                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default CreateCategory;
