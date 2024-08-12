import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signIn} from "../service/authService";
import {message} from "antd";

export const useSignIn = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async data => {
        try {
            setLoading(true)
            const response = await signIn(data.password, data.email)
            if (response) {
                navigate('/')
            }
            setLoading(false)
        } catch (e) {
            message.error(e)
            setLoading(false)
        }
    };

    const handleClickSignUp = () => navigate('/signUp')

    return {
        onSubmit,
        loading,
        handleClickSignUp
    }
}
