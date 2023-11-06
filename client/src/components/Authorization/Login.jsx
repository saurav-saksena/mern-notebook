import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [check, setCheck] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleCheckbox = (e) => {
        setCheck(e.target.checked);
    };
    const handleLogin = async () => {
        if (!email || !password) {
            toast.warning(
                "all fields are required !",

                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                    className: "toast--message",
                }
            );

            return;
        }
        let result = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();

        if (result.success) {
            toast.success(result.success, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
                className: "toast--message",
            });
            localStorage.setItem("tokenNotebook", JSON.stringify(result.authToken));
            setTimeout(() => {

                navigate("/");
            }, 1000)
        } else {
            toast.error(result.msg, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                className: "toast--message",
            });
        }
    };
    useEffect(() => {
        const auth = localStorage.getItem("tokenNotebook");
        if (auth) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <div className="login--main--container">
                <form className="login--container" onSubmit={(e) => e.preventDefault()}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        name="email"
                        className="login--input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email id"

                    />

                    <input
                        type={check ? "text" : "password"}
                        name="password"
                        className="login--input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"

                    />
                    <div className="password--changer">
                        <input
                            id="signup--passwords"
                            type="checkbox"
                            value={check}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor="signup--passwords" style={{ color: "black" }}>
                            show password
                        </label>
                    </div>
                    <button type="submit" onClick={handleLogin} className="login--button">
                        login
                    </button>
                    <Link to="/signup" className="login--link">
                        don't have an account? signup(create Account)
                    </Link>
                </form>

            </div>
        </>
    );
}

