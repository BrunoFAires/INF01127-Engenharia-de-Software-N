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
                navigate('../', {replace: true})
            }
        } finally {
            setLoading(false)
        }
    };

    return {
        onSubmit,
        loading
    }
}
