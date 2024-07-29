export class PostVO {
    constructor(id, text, imagePath, likes, comments, user) {
        this.id = id;
        this.text = text;
        this.imagePath = imagePath;
        this.likes = likes;
        this.comments = comments;
        this.user = user
    }
}