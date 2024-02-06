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
                <div className="register-main-content" onSubmit={handleSubmit}>
                    <h1>LOGIN FORM</h1>
                    <form className="regsiter-main-content-form">

                        <div className="register-main-form-content">
                            <label>Email</label>
                            <input type="text" className="register-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="register-main-form-content">
                            <label>Password</label>
                            <div className="password-div">
                                <input type={pass ? "text" : "password"} className="register-input password-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
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
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </div>


                    </form>

                    <h3>If not already registered ! <Link to={"/register"}>Register</Link></h3>
                </div>
            </div>
        </Layout>
    )
};

export default Login;
