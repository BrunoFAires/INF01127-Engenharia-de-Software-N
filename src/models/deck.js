import {CardDeck} from "./cardDeck";

export class Deck {
    constructor(id, title, description, rating, user, cards) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.rating = rating
        this.cards = cards.map(it => new CardDeck(it.card.id, it.card.card_id, it.card.name, it.card.description, it.card.image, it.card.artist, it.card.rarity, it.card.type, this))
    }


    cardsLenght() {
        return this.cards.length
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            rating: this.rating,
            user_id: this.user.id
        }
    }

    setTitle(title) {
        this.title = title
    }

    setDescription(description) {
        this.description = description
    }

    setUser(user){
        this.user = user
    }

    addCard(card) {
        this.cards.push(card)

        return this
    }

    removeCard(id) {
        const index = this.cards.findIndex(it => it.card_id === id);

        if (index !== -1) {
            this.cards.splice(index, 1);
        }
    }

    hasCard(id) {
        return this.cards.filter(it => it.id === id).length > 0
    }

    totalCard(id) {
        return this.cards.filter(it => it.card_id === id).length
    }

    groupedCardsById() {
        const seen = new Set();
        return this.cards.filter(item => {
            if (!seen.has(item.card_id)) {
                seen.add(item.card_id);
                return true;
            }
            return false;
        });
    }

    fromObject(deck){
        this.id = deck.id
        this.title = deck.title;
        this.description = deck.description;
        this.user = deck.user;
        this.rating = deck.rating
        this.cards = deck.cards.map(it => new CardDeck(it.id, it.card_id, it.name, it.description, it.image, it.artist, it.rarity, it.type, this))
    }
}
