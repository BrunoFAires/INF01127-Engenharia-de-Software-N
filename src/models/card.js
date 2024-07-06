export class Card {
    constructor(id, name, description, image, deck) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.deck = deck;
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            image: this.image,
            deck_id: this.deck.id
        }
    }

}
