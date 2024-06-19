import React, {useEffect, useState} from 'react';
import {Navigate,} from 'react-router-dom';
import {getCurrentUser} from "../../service/authService";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then(result => {
            console.log(result)
            console.log(Boolean(result))
            setIsAuthenticated(Boolean(result))
        }).finally(() => {
                setLoading(false)
            }
        )
    }, []);

    return loading ? <></> : (isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" replace/>);

};

