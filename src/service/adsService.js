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

export const fetchAnuncios = async ({ filters, searchTerm, sortOrder, currentPage, pageSize }) => {
    const { data, error } = await supabase
        .rpc('fetch_filtered_anuncios', {
            filter_price: filters.price || null,
            filter_artist: filters.artist || null,
            filter_rarity: filters.rarity || null,
            filter_pokemon: filters.name || null,
            search_term: searchTerm || '',
        });

    if (error) {
        return [];
    }

    let sortedData = data;
    if (sortOrder === "number_asc") {
        sortedData = sortedData.sort((a, b) => a.card_id - b.card_id);
    } else if (sortOrder === "price_asc") {
        sortedData = sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price_desc") {
        sortedData = sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "title") {
        sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }

    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return paginatedData;
};

export const fetchTotalAnuncios = async (filters) => {
    let query = supabase
        .from('advertisements')
        .select('id', { count: 'exact' });

    if (filters.price) query = query.gte('price', filters.price);
    if (filters.artist) query = query.eq('card.artist', filters.artist);
    if (filters.rarity) query = query.eq('card.rarity', filters.rarity);
    if (filters.name) query = query.eq('card.name', filters.name);

    const { count, error } = await query;

    if (error) {
        return 0;
    }

    return count;
};