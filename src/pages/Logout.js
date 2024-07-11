import {supabase} from "../service/supabaseClient";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.signOut().then(_ => navigate('/', {replace: true}))
    }, [navigate]);

    return <></>
}
