export class Comment {
    constructor(id, text, likes, at, profile, post) {
        this.id = id;
        this.text = text;
        this.likes = likes;
        this.at = at
        this.profile = profile;
        this.post = post;
    }

    setText(text) {
        this.text = text;
    }
    setId(id) {
        this.id = id;
    }

    setProfile(profile) {
        this.profile = profile
    }

    setPost(post) {
        this.post = post
    }

    toSupabaseInstance() {
        return {
            text: this.text,
            likes: this.likes,
            user_id: this.profile.id,
            post_id: this.post.id
        }
    }
}