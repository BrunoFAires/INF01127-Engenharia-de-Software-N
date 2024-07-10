import React, {useEffect, useState} from 'react';
import {Navigate,} from 'react-router-dom';
import {getCurrentUser} from "../../service/authService";

export const ProtectedRoute = ({children, user}) => {
    const [currentUser, setCurrentUser] = useState(user)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUser(user)
        }).finally(_ => {
            setLoading(false)
        })

    }, []);
    return loading ? <></> : (currentUser ? children : <Navigate to="/signin" replace/>)

};

