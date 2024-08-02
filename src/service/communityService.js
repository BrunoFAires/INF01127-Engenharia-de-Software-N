import {supabase} from "./supabaseClient";
import {Post} from "../models/post";
import {User} from "../models/user";
import {getCurrentUser} from "./authService";

export const addNewPost = async (post, currentUser) => {
    const result = await supabase.from('post')
        .insert(post.toSupabaseInstance())
        .select();

    return new Post(result.data[0].id, result.data[0].text, result.data[0]?.imagePath, 0, 0, currentUser)
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

    console.log(likedPosts)

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
