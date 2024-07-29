import {supabase} from "./supabaseClient";

export const addNewPost = async (post) => {
    await supabase.from('post')
        .insert(post)
}