import {useNavigate} from "react-router-dom";
import {createAccount} from "../service/authService";
import {useState} from "react";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async data => {
        try {
            setLoading(true)
            const response = await createAccount(data);

            if (response.data.user) {
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
