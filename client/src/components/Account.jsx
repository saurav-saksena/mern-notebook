import React, { useContext } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { useNavigate } from 'react-router-dom'
import img from "../accountimg.png"

export default function Account() {
    const { userDetails } = useContext(NoteContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear("tokenNotebook");
        navigate("/login");
    };
    return (
        <>
            <div className="dropdown ">
                <div className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                    <img className="nav--logo"

                        src={img}
                        alt="profile"
                        title="Account"

                    />
                </div>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li><span className="dropdown-item account--heading">Name : {userDetails.name}</span></li>
                    <li><span className="dropdown-item account--heading">Email : {userDetails.email}</span></li>
                    <li><span className="dropdown-item account--heading">Created at : {new Date(userDetails.date).toLocaleDateString()}</span></li>
                    <li><button className="dropdown-item bg-primary text-center account--heading mt-1" onClick={logout}>logout</button></li>
                </ul>
            </div>
        </>
    )
}
