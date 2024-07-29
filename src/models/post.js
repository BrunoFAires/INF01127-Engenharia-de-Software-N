export class Post {
    constructor(id, text, imagePath, likes, comments, user) {
        this.id = id;
        this.text = text;
        this.imagePath = imagePath;
        this.likes = likes;
        this.comments = comments;
        this.user = user
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            text: this.text,
            imagePath: this.imagePath,
            user: this.user.id,
        }
    }

}
