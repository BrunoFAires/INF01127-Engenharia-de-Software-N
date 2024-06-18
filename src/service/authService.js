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
    return new User(result.id, result.email, null, result.user_metadata.name, result.user_metadata.surname, result.user_metadata.admin, result.user_metadata.seller)

}
