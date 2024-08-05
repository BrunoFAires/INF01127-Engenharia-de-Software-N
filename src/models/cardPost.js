import {Card} from "./card";

export class CardPost extends Card{
    constructor(id, card_id, name, description, image, artist, rarity, type, post) {
        super(id, card_id, name, description, image, artist, rarity, type);
        this.post = post;
    }

    toSupabaseInstance() {
        return super.toSupabaseInstance()
    }

}
