import {Card} from "./card";

export class CardDeck extends Card{
    constructor(id, card_id, name, description, image, artist, rarity, type, deck) {
        super(id, card_id, name, description, image, artist, rarity, type);
        this.deck = deck;
    }

    toSupabaseInstance() {
        return super.toSupabaseInstance()
    }

}
