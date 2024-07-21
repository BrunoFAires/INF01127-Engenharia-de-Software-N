import { supabase } from "./supabaseClient";

// Função para inserir um novo anúncio
export const insertAnuncio = async (anuncio) => {
    const { data, error } = await supabase
        .from('advertisements')
        .insert(anuncio.toSupabaseInstance());

    if (error) {
        console.error("Error inserting anuncio: ", error);
        throw error;
    }

    return data;
}

// Função para atualizar um anúncio existente
export const updateAnuncio = async (anuncio) => {
    const { data, error } = await supabase
        .from('advertisements')
        .update(anuncio.toSupabaseInstance())
        .eq('id', anuncio.id);

    if (error) {
        console.error("Error updating anuncio: ", error);
        throw error;
    }

    return data;
}

// Função para obter os anúncios do usuário
export const myAnuncios = async (user) => {
    const { data, error } = await supabase
        .from('advertisements')
        .select('*, card(*)')
        .eq('seller', user.id);

    if (error) {
        console.error("Error fetching anuncios: ", error);
        throw error;
    }

    return data;
}

export const deleteAnuncio = async (anuncio) => {
    if (!anuncio.id) {
        return;
    }

    const { data, error } = await supabase
        .from('advertisements')
        .delete()
        .eq('seller', anuncio.seller.id)
        .eq('id', anuncio.id);

    if (error) {
        console.error("Error deleting anuncio: ", error);
        throw error;
    }

    return data;
}
