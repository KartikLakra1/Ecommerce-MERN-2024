import React, { useState } from "react";
import './Register.css';
import Layout from "../../Components/Layout/Layout";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [pass, setPass] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    const handlePassword = () => {
        setPass(!pass);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/auth/register", {
                name, email, password, phone, address, answer
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate("/login")
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
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex flex-col items-center justify-center shadow-slate-600 shadow-2xl w-[90%] lg:w-[40%] gap-2">
                    <h1 className="text-3xl font-bold bg-slate-200 text-black p-3 w-[80%] lg:w-[70%] text-center rounded-2xl">REGISTERATION FORM</h1>
                    <form className="regsiter-main-content-form" onSubmit={handleSubmit}>
                        <div className="register-main-form-content">
                            <label>Name</label>
                            <input type="text" className="register-input text-black" value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="register-main-form-content">
                            <label>Email</label>
                            <input type="email" className="register-input text-black" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="register-main-form-content">
                            <label>Password</label>
                            <div className="password-div bg-white">
                                <input type={pass ? "text" : "password"} className="register-input password-input text-black" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
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
                            <label>Phone</label>
                            <input type="text" className="register-input text-black" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required />
                        </div>

                        <div className="register-main-form-content">
                            <label>Address</label>

                            <input type="text" className="register-input text-black" value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />


                        </div>
                        <div className="register-main-form-content">
                            <label>What is your Favourite Sports</label>

                            <input type="text" className="register-input text-black" value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required />


                        </div>
                        <div className="register-main-form-content">
                            <button type="submit" className="bg-blue-950 text-white p-2 font-bold text-xl hover:bg-blue-600 duration-300 w-full">
                                Submit
                            </button>
                        </div>

                    </form>
                    <h3>If already registered ! <Link className="text-black text-xl" to={"/login"}>Login</Link></h3>
                </div>
            </div>
        </Layout>
    )
};

export default Register;
