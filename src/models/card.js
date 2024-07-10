export class Card {
    constructor(id, card_id, name, description, image, artist, rarity, type, deck) {
        this.id = id;
        this.card_id = card_id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.artist = artist;
        this.rarity = rarity;
        this.type = type;
        this.deck = deck;
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            card_id: this.card_id,
            name: this.name,
            description: this.description,
            image: this.image,
            artist: this.artist,
            rarity: this.rarity,
            type: this.type
        }
    }

}
