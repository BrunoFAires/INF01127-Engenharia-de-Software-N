import {useNavigate} from "react-router-dom";

export const useHeader = () => {
    const navigate = useNavigate()


    return {
        navigate
    }
}