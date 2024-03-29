import React, { useState } from "react";
import './Login.css';
import Layout from "../../Components/Layout/Layout";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth";

const Login = () => {
    const [pass, setPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const location = useLocation();


    const handlePassword = () => {
        setPass(!pass);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/auth/login", {
                email, password
            });
            if (response.data.success) {
                alert(response.data.message);
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                })
                localStorage.setItem('auth', JSON.stringify(response.data))
                navigate(location.state || "/")
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong")
        }
    }

    return (
        <Layout>
            <div className="register-main">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex flex-col items-center justify-center shadow-slate-600 shadow-2xl w-[90%] lg:w-[40%] gap-2" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold bg-slate-200 text-black p-3 w-[80%] lg:w-[50%] text-center rounded-2xl">LOGIN FORM</h1>
                    <form className="flex flex-col items-center justify-center gap-3 lg:w-[50%] w-[70%]">

                        <div className="flex flex-col items-start justify-start gap-2 w-[90%]">
                            <label className="text-xl font-bold w-full">Email</label>
                            <input type="text" className="flex justify-start text-start p-2  text-black w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="enter your email" />

                        </div>

                        <div className="flex flex-col items-start justify-start gap-2 w-[90%]">
                            <label className="text-xl font-bold w-full">Password</label>
                            <div className="flex items-center justify-center w-[100%]">
                                <input type={pass ? "text" : "password"} className="register-input password-input text-black w-[90%] p-2 "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="enter your password"
                                />
                                <span onClick={handlePassword} className="bg-black p-1 pt-1 pb-1">
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

                        <div className="flex items-center justify-center flex-col mt-3 w-[50%]">
                            <button type="submit" className="bg-blue-950 text-white p-2 font-bold text-xl hover:bg-blue-600 duration-300 w-full">
                                Submit
                            </button>

                            <button type="button" className="bg-red-500 text-white hover:bg-red-800 text-lg font-semibold duration-700 w-full mt-2" onClick={() => { navigate('/forgot-password') }}>
                                Forgot Password
                            </button>
                        </div>


                    </form>

                    <h3 className="mt-4">If not already registered ! <Link to={"/register"} className="text-red-100">Register</Link></h3>
                </div>
            </div>
        </Layout>
    )
};

export default Login;
