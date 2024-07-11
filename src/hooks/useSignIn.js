import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signIn} from "../service/authService";

export const useSignIn = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async data => {
        try {
            setLoading(true)
            const response = await signIn(data.password, data.email)
            if (response?.data?.user) {
                navigate('/')
            }
            setLoading(false)
        } catch (e) {
            console.log(e)
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
