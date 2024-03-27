import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../Context/Auth";


const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [pass, setPass] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handlePassword = () => {
        setPass(!pass);
    }



    // get user data
    useEffect(() => {
        const { email, phone, address, name } = auth.user
        setName(name);
        setPhone(phone);
        setAddress(address);
        setEmail(email)
    }, [])


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name, email, password, phone, address,
            }, {
                headers: {
                    "Authorization": auth?.token
                }
            });
            if (data?.error) {
                alert(data.error);

            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls));

                alert("Profile updated succcessfully");
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong")
        }
    }


    return (
        <Layout>
            <div className="adminDashboard-container">
                <UserMenu />
                <div className="content-container">
                    <div className="card">
                        <div className="register-main">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex flex-col items-center justify-center shadow-slate-600 shadow-2xl w-[90%] lg:w-[40%] gap-2">
                                <h1>PROFILE FORM</h1>
                                <form className="regsiter-main-content-form" onSubmit={handleSubmit}>
                                    <div className="register-main-form-content">
                                        <label>Name</label>
                                        <input type="text" className="register-input text-black" value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="register-main-form-content">
                                        <label>Email</label>
                                        <input type="email" className="register-input  text-black" value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                            disabled />
                                    </div>

                                    <div className="register-main-form-content">
                                        <label>Password</label>
                                        <div className="password-div">
                                            <input type={pass ? "text" : "password"} className=" text-black  register-input password-input" value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span onClick={handlePassword}>
                                                {
                                                    pass ? (
                                                        <FaEye size={25} />
                                                    ) : (
                                                        <FaEyeSlash size={25} />
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="register-main-form-content">
                                        <label>Phone</label>
                                        <input type="text" className="register-input  text-black" value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="register-main-form-content">
                                        <label>Address</label>

                                        <input type="text" className="register-input  text-black" value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />


                                    </div>
                                    <div className="register-main-form-content">
                                        <button type="submit" className="bg-blue-950 text-white p-2 font-bold text-xl hover:bg-blue-600 duration-300 w-full">
                                            Update
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    );
};

export default Profile;