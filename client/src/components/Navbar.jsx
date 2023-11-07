import React, { useContext } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { Link, useLocation } from 'react-router-dom'

import Account from './Account'
export default function Navbar() {
    let location = useLocation()
    const { notes } = useContext(NoteContext)
    const auth = localStorage.getItem("tokenNotebook");


    return (
        <div>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">

                    <Link className="navbar-brand fw-bold" to="/">
                        Notebook
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mt-1">
                            {auth && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page"
                                    to="/">Home</Link>
                            </li>
                            }
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            {auth && <li className='nav-item' title={`availabe notes ${notes.length}`}>
                                <button type="button" className="btn btn-dark">
                                    Notes : <span className="badge text-bg-danger">{notes.length}</span>
                                </button>
                            </li>

                            }


                        </ul>

                        <div className='d-flex justify-content-center'>


                            {auth ? <Account /> : <div>
                                <Link className="btn btn-primary m-1 fw-bold" to="/login">log in</Link>
                                <Link className="btn btn-primary m-1 fw-bold" to="/signup">signup</Link>
                            </div>

                            }


                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
