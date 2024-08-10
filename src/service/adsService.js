import { supabase } from "./supabaseClient";
import {Advertisements} from "../models/advertisements";

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

export const getAnuncios = async (i) => {
    try {
        const { data, error } = await supabase
            .from('advertisements')
            .select('*, card(*)')
            .order('created_at', {ascending: false})
            .range(i * 10, 9 + (i * 10))

        if (error) {
            throw 'Erro ao carregar os anúncios';
        }

        return data.map(it => {return new Advertisements(it.id, it.title, it.description, it.quantity, it.status, it.created_at, it.price, it.card, null, it.sale)})
    } catch (error) {
        console.error("Error in deleteAnuncio function: ", error);
        throw error;
    }
}
