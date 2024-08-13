export class Post {
    #id;
    #text;
    #imagePath;
    #likes;
    #dislikes;
    #comments;
    #liked;
    #disliked;
    #user;
    #cardPost;

    constructor(id, text, imagePath, likes, dislikes, comments, liked, disliked, user, cardPost) {
        this.#id = id;
        this.#text = text;
        this.#imagePath = imagePath;
        this.#likes = likes;
        this.#dislikes = dislikes;
        this.#comments = comments;
        this.#liked = liked;
        this.#disliked = disliked;
        this.#user = user;
        this.#cardPost = cardPost || [];
    }

    get id() {
        return this.#id;
    }

    get text() {
        return this.#text;
    }

    get imagePath() {
        return this.#imagePath;
    }

    get likes() {
        return this.#likes;
    }

    get dislikes() {
        return this.#dislikes;
    }

    get comments() {
        return this.#comments;
    }

    get liked() {
        return this.#liked;
    }

    get disliked() {
        return this.#disliked;
    }

    get user() {
        return this.#user;
    }

    get cardPost() {
        return this.#cardPost;
    }

    set id(value) {
        this.#id = value;
    }

    set text(value) {
        this.#text = value;
    }

    set imagePath(value) {
        this.#imagePath = value;
    }

    set likes(value) {
        this.#likes = value;
    }

    set dislikes(value) {
        this.#dislikes = value;
    }

    set comments(value) {
        this.#comments = value;
    }

    set liked(value) {
        this.#liked = value;
    }

    set disliked(value) {
        this.#disliked = value;
    }

    set user(value) {
        this.#user = value;
    }

    set cardPost(value) {
        this.#cardPost = value;
    }

    setText(text) {
        this.#text = text;
    }

    likePost() {
        if (this.#liked) {
            this.#liked = false;
            this.#likes--;
        } else {
            this.#liked = true;
            this.#likes++;

            if (this.#disliked) {
                this.#disliked = false;
                this.#dislikes--;
            }
        }
    }

    dislikePost() {
        if (this.#disliked) {
            this.#disliked = false;
            this.#dislikes--;
        } else {
            this.#disliked = true;
            this.#dislikes++;

            if (this.#liked) {
                this.#liked = false;
                this.#likes--;
            }
        }
    }

    addComment() {
        this.#comments++;
    }

    removeComment() {
        this.#comments--;
    }

    setUser(user) {
        this.#user = user;
    }

    setCardPost(cardPost) {
        cardPost.forEach(post => {
            this.#cardPost.push(post);
        });
    }

    toSupabaseInstance() {
        return {
            text: this.#text,
            image_path: this.#imagePath,
            user_id: this.#user.id,
        };
    }
}
