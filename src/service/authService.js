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

export const updateProfile = async (user, isProfileTypeChanged) => {

    if (isProfileTypeChanged) {
        const result = await supabase
            .from('advertisements')
            .select('*', {count: 'exact', head: true})
            .eq('seller', user.id)
            .single()
        const {error, count} = result
        if (error) {
            // eslint-disable-next-line no-throw-literal
            throw 'Ocorreu um erro ao processar a solicitação'
        }

        if (count > 0) {
            // eslint-disable-next-line no-throw-literal
            throw 'Você ainda possui anuncios ativos.\n Exclua-os antes de tentar mudar o tipo do seu perfil.'
        }

    }

    const result = await supabase
        .from('profile')
        .update(user.profile.toSupabaseInstance())
        .eq('id', user.id)
    const {error} = result
    if (error) {
        // eslint-disable-next-line no-throw-literal
        throw 'Ocorreu um erro ao processar a solicitação'
    }

    return new User(user.id, user.email, user.profile.name, user.profile.surname, user.profile.admin, user.profile.seller)

}

export const signIn = async (password, email) => {
    const result = await supabase.auth.signInWithPassword({password: password, email: email})
    const {data, error} = result

    if (error) {
        throw 'Credenciais incorretas. Tente novamente ou cadastre-se.'
    }

    return data?.user;
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
        // eslint-disable-next-line no-throw-literal
        throw 'Erro ao buscar o perfil.'
    }

    return new User(result.id, result.email, data.name, data.surname, data.admin, data.seller)
}

export const alterUser = (data) => {
    supabase.from('profile').update({seller: data.seller, admin: data.admin}).eq('id', data.id)
    supabase.from('deck').select().eq('user_id', data.id)
}
