import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken, navigate]);

    // If there's no access token, don't render the protected content
    if (!accessToken) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
