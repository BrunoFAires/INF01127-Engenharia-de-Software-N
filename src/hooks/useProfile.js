import {useAuthHook} from "./useAuthHook";
import {useEffect, useState} from "react";
import {updateProfile} from "../service/authService";
import {message} from "antd";

export const useProfile = () => {
    const {currentUser, loading} = useAuthHook()
    const [update, setUpdate] = useState(false)
    const [enableButton, setEnableButton] = useState(false)
    const [isSeller, setIsSeller] = useState(currentUser?.profile.seller)

    const handleChangeName = (data) => {
        currentUser.profile.setName(data.target.value)
        setUpdate(!update)
        setEnableButton(true)
    }

    useEffect(() => {
        if(currentUser){
            setIsSeller(currentUser.profile.seller)
        }
    }, [currentUser]);

    const handleChangeSurname = (data) => {
        currentUser.profile.setSurname(data.target.value)
        setUpdate(!update)
        setEnableButton(true)
    }

    const handleChangeAccountType = (isSeller) => {
        currentUser.profile.setSeller(isSeller)
        setUpdate(!update)
        setEnableButton(true)

    }

    const handleSaveUpdateProfile = async () => {
        try {
            const isChangedProfileType = isSeller !== currentUser.profile.seller
            await updateProfile(currentUser, isChangedProfileType)
            message.success('Perfil atualizado com sucesso.')
            setIsSeller(currentUser.profile.seller)
        } catch (e) {
            message.error(e)
        }
    }


    return {
        currentUser,
        loading,
        enableButton,
        handleChangeName,
        handleChangeSurname,
        handleChangeAccountType,
        handleSaveUpdateProfile
    }
}