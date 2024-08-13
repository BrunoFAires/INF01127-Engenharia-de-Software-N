import {Card} from "./card";

export class CardPost extends Card{
    #post
    constructor(id, card_id, name, description, image, artist, rarity, type, post) {
        super(id, card_id, name, description, image, artist, rarity, type);
        this.#post = post;
    }

    set post(post){
        this.#post = post
    }

    get post(){
        return this.#post
    }

    toSupabaseInstance() {
        return super.toSupabaseInstance()
    }

}
