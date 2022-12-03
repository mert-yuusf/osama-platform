import React from 'react';

import { NavLink } from "react-router-dom";

function Tabs() {
    return (<>
        <ul className="nav nav-pills bg-light  nav-fill mb-5">
            <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/dashboard/profile">My Profile</NavLink>
            </li>
            <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/dashboard/skills">Skills</NavLink>
            </li>
            <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/dashboard/work">Works & Experience</NavLink>
            </li>
            <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/dashboard/social">Social Links</NavLink>
            </li>
            <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/dashboard/address"> Address</NavLink>
            </li>
        </ul>
    </>);
}

export default Tabs;