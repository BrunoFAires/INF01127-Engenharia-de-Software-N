export class Comment {
    #id;
    #text;
    #likes;
    #at;
    #profile;
    #post;

    constructor(id, text, likes, at, profile, post) {
        this.#id = id;
        this.#text = text;
        this.#likes = likes;
        this.#at = at;
        this.#profile = profile;
        this.#post = post;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get text() {
        return this.#text;
    }

    set text(value) {
        this.#text = value;
    }

    get likes() {
        return this.#likes;
    }

    set likes(value) {
        this.#likes = value;
    }

    get at() {
        return this.#at;
    }

    set at(value) {
        this.#at = value;
    }

    get profile() {
        return this.#profile;
    }

    set profile(value) {
        this.#profile = value;
    }

    get post() {
        return this.#post;
    }

    set post(value) {
        this.#post = value;
    }

    toSupabaseInstance() {
        return {
            text: this.#text,
            likes: this.#likes,
            user_id: this.#profile.id,
            post_id: this.#post.id
        };
    }
}
