import React, { useState } from "react";
import './ForgotPassword.css';
import Layout from "../../Components/Layout/Layout";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, } from "react-router-dom";


const ForgotPassword = () => {

    const [pass, setPass] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate()




    const handlePassword = () => {
        setPass(!pass);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/forgot-password", {
                email, answer, newPassword
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate("/login")
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong don't know why")
        }
    }

    return (
        <Layout>
            <div className="register-main">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex flex-col items-center justify-center shadow-slate-600 shadow-2xl w-[90%] lg:w-[40%] gap-2" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold bg-slate-200 text-black p-3 w-[80%] lg:w-[70%] text-center rounded-2xl">RESET PASSWORD FORM</h1>
                    <form className="regsiter-main-content-form">

                        <div className="register-main-form-content">
                            <label>Email</label>
                            <input type="text" className="register-input text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="register-main-form-content">
                            <label>Add Answer</label>
                            <input type="text" className="register-input text-black"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)} />
                        </div>

                        <div className="register-main-form-content">
                            <label>Add New Password</label>
                            <div className="password-div  bg-white">
                                <input type={pass ? "text" : "password"} className="register-input password-input text-black"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                                <span onClick={handlePassword} className="bg-black p-1">
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
                            <button type="submit" className="bg-red-500 text-white hover:bg-red-800 text-lg font-semibold duration-700 w-full mt-2">
                                Reset
                            </button>


                        </div>


                    </form>

                    <h3>If not already registered ! <Link to={"/register"}>Register</Link></h3>
                </div>
            </div>
        </Layout>
    )
};

export default ForgotPassword;