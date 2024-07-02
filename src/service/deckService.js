import {supabase} from "./supabaseClient";

export const myDecks = () => {
    const result = supabase.from('deck')
}