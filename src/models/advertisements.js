import { Card } from "./card";

export class Advertisements {
    constructor(id, title, description, quantity, status, createdAt, price, card, seller, sale) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.price = price;
        this.card = card ? new Card(card.id, card.card_id, card.name, card.description, card.image, card.artist, card.rarity, card.type, this) : null;
        this.seller = seller;
        this.sale = sale;
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
            seller: this.seller ? this.seller.id : null,
            sale: this.sale,
        };
    }

    setId(id) {
        this.id = id
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

    setSale(sale) {
        this.sale = sale;
    }

    setPrice(price) {
        this.price = price;
    }

    setCard(card) {
        this.card = new Card(card.id, card.card_id, card.name, card.description, card.image, card.artist, card.rarity, card.type, this);
    }

    fromObject(ad) {
        this.id = ad.id;
        this.title = ad.title;
        this.description = ad.description;
        this.quantity = ad.quantity;
        this.status = ad.status;
        this.createdAt = ad.created_at;
        this.price = ad.price;
        this.card = ad.card ? new Card(ad.card.id, ad.card.card_id, ad.card.name, ad.card.description, ad.card.image, ad.card.artist, ad.card.rarity, ad.card.type) : null;
        this.seller = ad.seller;
    }
}
