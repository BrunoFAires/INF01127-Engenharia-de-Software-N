import {supabase} from "./supabaseClient";
import {Post} from "../models/post";
import {User} from "../models/user";
import {getCurrentUser} from "./authService";
import {Comment} from "../models/comment";
import {Profile} from "../models/profile";

export const addNewPost = async (post, currentUser) => {
    const result = await supabase.from('post')
        .insert(post.toSupabaseInstance())
        .select();

    return new Post(result.data[0].id, result.data[0].text, result.data[0]?.imagePath, 0, 0, 0, false, false, currentUser)
}

export const findPostByLikes = async (i) => {
    const posts = await supabase
        .from('post')
        .select('*, profile(*)')
        .order('likes', {ascending: false})
        .range(i * 10, 9 + (i * 10))

    if (!posts.data)
        return []

    const postIds = posts.data.map(it => it.id);
    const currentUser = await getCurrentUser()

    const likedPosts = await supabase.rpc('get_liked_post', {post_ids: postIds, current_user_id: currentUser.id})

    return posts.data.map(it => {
        const liked = likedPosts.data && !!likedPosts.data.some(l => l.isLike && l.postId === it.id)
        const disliked = likedPosts.data && !!likedPosts.data.some(l => !l.isLike && l.postId === it.id)
        return new Post(it.id, it.text, it.imagePath, it.likes, it.dislikes, it.comments, liked, disliked,
            new User(it.profile.id, '', it.profile.name, it.profile.surname, it.profile.admin, it.profile.seller))

    })
}

export const countTotalPosts = async () => {
    const total = await supabase.from('post')
        .select('count')

    return total.data[0]?.count
}

export const reactPost = async (post, user, isLike) => {
    await supabase.rpc('likepost', {postid: post.id, userid: user.id, p_islike: isLike})

}

export const commentsByPost = async (post) => {
    const response = await supabase
        .from('comment')
        .select('*, profile(*)')
        .eq('post_id', post.id)

    if (!response.data)
        return []
    return response.data.map(it => new Comment(it.id, it.text, it.likes, it.at, new Profile(it.profile.id, it.profile.name, it.profile.surname, it.profile.admin, it.profile.seller), post))

}

export const findPostById = async (postId) => {
    const result = await supabase
        .from('post')
        .select('*, profile(*)')
        .eq('id', postId)

    if (!result.data)
        return null

    const currentUser = await getCurrentUser()

    const likedPosts = await supabase.rpc('get_liked_post', {post_ids: [postId], current_user_id: currentUser.id})

    const liked = likedPosts.data && !!likedPosts.data.some(l => l.isLike && l.postId === result.data[0].id)
    const disliked = likedPosts.data && !!likedPosts.data.some(l => !l.isLike && l.postId === result.data[0].id)

    return new Post(result.data[0].id, result.data[0].text, result.data[0].imagePath, result.data[0].likes, result.data[0].dislikes, result.data[0].comments, liked, disliked,
        new User(result.data[0].profile.id, '', result.data[0].profile.name, result.data[0].profile.surname, result.data[0].profile.admin, result.data[0].profile.seller))

}

export const deletePost = async (post) => {
    if(!post.id){
        return
    }
    return supabase.from('post').delete().eq('id', post.id)
}

export const deleteComment = async (comment) => {
    if(!comment.id){
        return
    }
    return supabase.from('comment').delete().eq('id', comment.id)
}

export const addComment = async (comment) => {
    await supabase
        .from('comment')
        .insert(comment.toSupabaseInstance())
}