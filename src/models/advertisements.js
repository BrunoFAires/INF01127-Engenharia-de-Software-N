import { Card } from "./card";

export class Advertisements {
    constructor(id, title, description, quantity, status, createdAt, price, card, seller) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.price = price;
        this.card = new Card(card.id, card.card_id, card.name, card.description, card.image, card.artist, card.rarity, card.type, this);
        this.seller = seller;
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
            card_id: this.card.id,
            seller_id: this.seller.id,
        };
    }

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    setStatus(status) {
        this.status = status;
    }

    setPrice(price) {
        this.price = price;
    }

    setCard(card) {
        this.card = new Card(card.id, card.card_id, card.name, card.description, card.image, card.artist, card.rarity, card.type, this);
    }

    fromObject(anuncio) {
        this.id = anuncio.id;
        this.title = anuncio.title;
        this.description = anuncio.description;
        this.quantity = anuncio.quantity;
        this.status = anuncio.status;
        this.createdAt = anuncio.created_at;
        this.price = anuncio.price;
        this.card = new Card(anuncio.card.id, anuncio.card.card_id, anuncio.card.name, anuncio.card.description, anuncio.card.image, anuncio.card.artist, anuncio.card.rarity, anuncio.card.type, this);
        this.seller = anuncio.seller;
    }
}
