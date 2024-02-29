import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/Auth";

const User = () => {
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0);

    const getallusers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/getall-users", {
                headers: {
                    "Authorization": auth?.token
                }
            })

            if (data?.success) {
                setUsers(data?.Allusers);
                setTotal(data?.totalCount);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/auth/delete-user/${pid}`,
                {
                    headers: {
                        "Authorization": auth?.token
                    }
                }
            )

            if (data.success) {
                alert("user deleted successfully");
                getallusers();
            } else {
                alert("error in deletion of user");
            }

        } catch (error) {
            console.log(error);
            alert("error in deletion of user");
        }
    }

    useEffect(() => {
        getallusers()
    }, [])

    return (
        <Layout>
            <div className="adminDashboard-container">
                <AdminMenu />
                <div className="content-container">
                    <div className="card">
                        <h1>Users</h1>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div>
                                <p className="font-bold text-red-700 text-2xl">Total user : {total}</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
                                {
                                    users.map(u => (
                                        <div className="border-4 p-2 rounded-lg border-indigo-600 shadow-xl drop-shadow-lg" key={u._id}>
                                            <h1>Name : {u.name}</h1>
                                            <h2>Email : {u.email}</h2>
                                            <h2>Phone : {u.phone}</h2>
                                            <h2>Address : {u.address}</h2>
                                            <h2>Answer : {u.answer}</h2>
                                            <button className="bg-red-700 text-white p-2 rounded-lg" onClick={() => { handleDelete(u._id) }}>Delete user</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
};

export default User;
