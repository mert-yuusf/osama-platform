import React from 'react';

import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "./localStorage";
function ProtectedRoute({ children }) {

    const token = getTokenFromLocalStorage()

    if (!token) {
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute;