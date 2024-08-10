export class Post {
    constructor(id, text, imagePath, likes, dislikes, comments, liked, disliked, user, cardPost) {
        this.id = id;
        this.text = text;
        this.imagePath = imagePath;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
        this.user = user
        this.liked = liked
        this.disliked = disliked
        this.cardPost = cardPost || []
    }

    setText = (text) => {
        this.text = text
    }

    likePost() {
        if (this.liked) {
            this.liked = false
            this.likes--
        } else {
            this.liked = true
            this.likes++

            if (this.disliked) {
                this.dislikes = false;
                this.disliked--;
            }
        }
    }

    dislikePost() {
        if (this.dislikes) {
            this.disliked = false
            this.dislikes--
        } else {
            this.disliked = true
            this.dislikes++

            if (this.liked) {
                this.liked = false;
                this.likes--;
            }
        }
    }

    addComment(){
        this.comments++
    }

    removeComment(){
        this.comments--
    }

    setUser = (user) => {
        this.user = user
    }

    setCardPost = (cardPost) => {
        cardPost.forEach(post => {this.cardPost.push(post)})
    }

    toSupabaseInstance() {
        return {
            text: this?.text,
            image_path: this?.imagePath,
            user_id: this.user.id,
        }
    }

}
