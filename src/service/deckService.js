import {supabase} from "./supabaseClient";

export const insertDeck = async (deck) => {
    await supabase.rpc('add_deck_with_cards', {
        deck: deck.toSupabaseInstance(),
        cards: deck.cards.map(it => it.toSupabaseInstance())
    });
}

export const updateDeck = async (deck, cardsToRemove) => {
    await supabase.rpc('update_deck', {
        deck_to_update: deck.toSupabaseInstance(),
        cards: deck.cards.filter(it => !Boolean(it.id)).map(it => it.toSupabaseInstance()),
        cards_to_remove: cardsToRemove
    });
}

export const myDecks = async (user) => {
    console.log(user)
    return supabase.from('deck').select('*, card(*)').eq('user_id', user.id);
}

export const deleteDeck = async (deck) => {
    if(!deck.id){
        return
    }
    return supabase.from('deck').delete().eq('user_id', deck.user.id).eq('id', deck.id);
}