import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Signup() {
    const [check, setCheck] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleCheckbox = (e) => {
        setCheck(e.target.checked)
    }
    const collectData = async () => {
        console.warn(name, email, password)
        if (name && email && password) {
            let result = await fetch("http://localhost:4000/api/auth/createuser", {
                method: "post",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json()

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

        } else {
            toast.warning(
                "all fields are required !",
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    className: 'toast-message1'
                }
            );
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem("tokenNotebook");
        if (auth) {
            navigate("/")
        }
    })
    return (
        <><div className="signup--container--first">
            <div className="signup--container">
                <ToastContainer />
                <p>Signup</p>

                <form className="signup--form" onSubmit={e => { e.preventDefault() }}>
                    <input
                        className="signup--input inone"
                        type="text"
                        placeholder="name"
                        name="name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        className="signup--input intwo"
                        type="email"
                        name="email"
                        placeholder="email id"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        className="signup--input inthree"
                        type={check ? "text" : "password"}
                        placeholder="Create Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password--changer">
                        <input id="signup--password" type="checkbox" value={check} onChange={handleCheckbox} />
                        <label htmlFor="signup--password">show password</label>
                    </div>
                    <button type="submit" className="signup--button" onClick={collectData}> signup</button>

                </form>
                <Link to="/login" className="signup--link">X</Link>
            </div>
        </div>
        </>
    )
}