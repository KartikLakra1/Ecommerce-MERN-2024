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
            const response = await axios.post("/api/v1/auth/forgot-password", {
                email, newPassword, answer
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
                <div className="register-main-content" onSubmit={handleSubmit}>
                    <h1>RESET PASSWORD FORM</h1>
                    <form className="regsiter-main-content-form">

                        <div className="register-main-form-content">
                            <label>Email</label>
                            <input type="text" className="register-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="register-main-form-content">
                            <label>Add Answer</label>
                            <input type="text" className="register-input"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)} />
                        </div>

                        <div className="register-main-form-content">
                            <label>Add New Password</label>
                            <div className="password-div">
                                <input type={pass ? "text" : "password"} className="register-input password-input"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
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