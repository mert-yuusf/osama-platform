import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/userSlice';
import { FcBusiness } from "react-icons/fc";
function Navbar() {
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
        navigate("/")
    }


    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <FcBusiness className='me-2 fs-3'></FcBusiness>
                    <p className='my-auto'>Jobs</p>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">





                    </ul>
                    <div className="d-flex">

                        {
                            user ?
                                <div className="my-auto me-3 dropdown">
                                    <button className="nav-link dropdown-toggle btn btn-secondary btn-sm rounded-2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='ms-2 text-white'>{user.fullName}</span>
                                    </button>
                                    <ul className="dropdown-menu rounded-0 bg-light">
                                        <li>
                                            <NavLink className="dropdown-item" aria-current="page" to="/dashboard/profile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <button onClick={logout} className="dropdown-item" >logout</button>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <Link to="/get-started" className='btn btn-outline-success ms-2 my-auto rounded-0'>Get started</Link>
                        }

                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;