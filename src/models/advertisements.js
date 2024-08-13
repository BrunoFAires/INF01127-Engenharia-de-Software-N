import { Card } from "./card";
import { Profile } from "./profile";

export class Advertisements {
    #id;
    #title;
    #description;
    #quantity;
    #status;
    #createdAt;
    #price;
    #card;
    #seller;
    #sale;

    constructor(id, title, description, quantity, status, createdAt, price, card, seller, sale) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#quantity = quantity;
        this.#status = status;
        this.#createdAt = createdAt;
        this.#price = price;
        this.#card = card ? new Card(card.id, card.card_id, card.name, card.description, card.image, card.artist, card.rarity, card.type, this) : null;
        this.#seller = new Profile(seller?.id, seller?.name, seller?.surname, seller?.admin, seller?.seller, seller?.evaluations, seller?.ratings);
        this.#sale = sale;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get quantity() {
        return this.#quantity;
    }

    get status() {
        return this.#status;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get price() {
        return this.#price;
    }

    get card() {
        return this.#card;
    }

    get seller() {
        return this.#seller;
    }

    get sale() {
        return this.#sale;
    }

    set id(value) {
        this.#id = value;
    }

    set title(value) {
        this.#title = value;
    }

    set description(value) {
        this.#description = value;
    }

    set quantity(value) {
        this.#quantity = value;
    }

    set status(value) {
        this.#status = value;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    set price(value) {
        this.#price = value;
    }

    set card(value) {
        this.#card = value ? new Card(value.id, value.card_id, value.name, value.description, value.image, value.artist, value.rarity, value.type, this) : null;
    }

    set seller(value) {
        this.#seller = new Profile(value?.id, value?.name, value?.surname, value?.admin, value?.seller, value?.evaluations, value?.ratings);
    }

    set sale(value) {
        this.#sale = value;
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            quantity: this.quantity,
            status: this.status,
            created_at: this.createdAt,
            price: this.price,
            card: this.card,
            seller: this.seller.id,
            sale: this.sale
        };
    }

    fromObject(order) {
        this.id = order.id;
        this.title = order.title;
        this.description = order.description;
        this.quantity = order.quantity;
        this.status = order.status;
        this.createdAt = order.createdAt;
        this.price = order.price;
        this.card = new Card(
            order.card.id,
            order.card.card_id,
            order.card.name,
            order.card.description,
            order.card.image,
            order.card.artist,
            order.card.rarity,
            order.card.type,
            this
        );
        this.seller = new Profile(
            order.profile.id,
            order.profile.name,
            order.profile.surname,
            order.profile.admin,
            order.profile.seller
        );
        this.sale = order.sale;
    }
}
