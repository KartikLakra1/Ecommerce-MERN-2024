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
                name, email, password, phone, address
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
                <div className="register-main-content">
                    <h1>REGISTERATION FORM</h1>
                    <form className="regsiter-main-content-form" onSubmit={handleSubmit}>
                        <div className="register-main-form-content">
                            <label>Name</label>
                            <input type="text" className="register-input" value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="register-main-form-content">
                            <label>Email</label>
                            <input type="email" className="register-input" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="register-main-form-content">
                            <label>Password</label>
                            <div className="password-div">
                                <input type={pass ? "text" : "password"} className="register-input password-input" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
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
                            <input type="text" className="register-input" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required />
                        </div>

                        <div className="register-main-form-content">
                            <label>Address</label>

                            <input type="text" className="register-input" value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />


                        </div>
                        <div className="register-main-form-content">
                            <label>What is your Favourite Sports</label>

                            <input type="text" className="register-input" value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required />


                        </div>
                        <div className="register-main-form-content">
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </div>

                    </form>
                    <h3>If already registered ! <Link to={"/login"}>Login</Link></h3>
                </div>
            </div>
        </Layout>
    )
};

export default Register;
