import {useEffect, useState} from "react";
import {getCurrentUser} from "../service/authService";

export const useAuthHook = () => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('a')
        getCurrentUser().then(user => {
            setCurrentUser(user)
        }).finally(_ => {
            setLoading(false)
        })

    }, []);

    return {currentUser, loading}
}