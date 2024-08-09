import {User} from "../models/user";
import {supabase} from "./supabaseClient";

export const createAccount = async (data) => {
    return await supabase.auth.signUp({
        email: data.email, password: data.password, options: {
            data: {
                name: data.name,
                surname: data.surname,
                admin: data.admin,
                seller: data.seller
            }
        }
    })
}



export const signIn = async (password, email) => {
    return await supabase.auth.signInWithPassword({password: password, email: email})
}

export const getCurrentUser = async () => {
    const result = await supabase.auth.getUser().then(it => it.data.user)
    if (!result) {
        return null
    }

    const resultProfile = await supabase
        .from('profile')
        .select('*')
        .eq('id', result.id)
        .single()

    const {error, data} = resultProfile

    if (error) {
        throw 'Erro ao buscar o perfil.'
    }

    return new User(result.id, result.email, data.name, data.surname, data.admin, data.seller)
}

export const alterUser = (data) => {
    supabase.from('profile').update({seller: data.seller, admin: data.admin}).eq('id', data.id)
    supabase.from('deck').select().eq('user_id', data.id)
}
