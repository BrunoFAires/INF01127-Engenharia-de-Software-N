import {CardDeck} from "./cardDeck";

export class Deck {
    #id;
    #title;
    #description;
    #user;
    #cards;

    constructor(id, title, description, user, cards) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#user = user;
        this.#cards = cards.map(it => new CardDeck(it.card.id, it.card.card_id, it.card.name, it.card.description, it.card.image, it.card.artist, it.card.rarity, it.card.type, this));
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get user() {
        return this.#user;
    }

    set user(value) {
        this.#user = value;
    }

    get cards() {
        return this.#cards;
    }

    set cards(value) {
        this.#cards = value;
    }

    toSupabaseInstance() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            user_id: this.#user.id
        };
    }

    addCard(card) {
        this.#cards.push(card);
        return this;
    }

    removeCard(id) {
        const index = this.#cards.findIndex(it => it.card_id === id);
        if (index !== -1) {
            this.#cards.splice(index, 1);
        }
    }

    hasCard(id) {
        return this.#cards.some(it => it.card_id === id);
    }

    totalCard(id) {
        return this.#cards.filter(it => it.card_id === id).length;
    }

    groupedCardsById() {
        const seen = new Set();
        return this.#cards.filter(item => {
            if (!seen.has(item.card_id)) {
                seen.add(item.card_id);
                return true;
            }
            return false;
        });
    }

    fromObject(deck) {
        this.#id = deck.id;
        this.#title = deck.title;
        this.#description = deck.description;
        this.#user = deck.user;
        this.#cards = deck.card_deck.map(it => new CardDeck(it.card.id, it.card.card_id, it.card.name, it.card.description, it.card.image, it.card.artist, it.card.rarity, it.card.type, this));
    }
}
