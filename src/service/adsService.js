import { supabase } from "./supabaseClient";

export const insertAnuncio = async (anuncio) => {
    await supabase.rpc('add_asd_with_card', {
        anuncio: anuncio.toSupabaseInstance(),
        card: anuncio.card.toSupabaseInstance()
    });
}

export const updateAnuncio = async (anuncio) => {
    await supabase.rpc('add_asd_with_card', {
        anuncio: anuncio.toSupabaseInstance(),
        card: anuncio.card.toSupabaseInstance()
    });
}

export const myAnuncios = async (user) => {
    try {
        const { data, error } = await supabase.from('advertisements').select('*, card(*)').eq('seller', user.id);

        if (error) {
            console.error("Error fetching anuncios: ", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error in myAnuncios function: ", error);
        throw error;
    }
}

export const deleteAnuncio = async (anuncioId) => {
    try {
        const { data, error } = await supabase
            .from('advertisements')
            .update({ status: 0 })
            .eq('id', anuncioId);

        if (error) {
            console.error("Error deleting anuncio: ", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error in deleteAnuncio function: ", error);
        throw error;
    }
}
