import {Card} from "./card";

export class CardDeck extends Card{
    #deck
    constructor(id, card_id, name, description, image, artist, rarity, type, deck) {
        super(id, card_id, name, description, image, artist, rarity, type);
        this.#deck = deck;
    }

    set deck(deck){
        this.#deck = deck
    }

    get deck(){
        return this.#deck
    }

    toSupabaseInstance() {
        return super.toSupabaseInstance()
    }

}
