import { Card } from "./card";
import {Profile} from "./profile";

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
        this.seller = new Profile(seller?.id, seller?.name, seller?.surname, seller?.admin, seller?.seller, seller?.evaluations, seller?.ratings);
        this.sale = sale;
    }

    toSupabaseInstance() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            quantity: this.quantity,
            status: this.status,
            created_at: this.created_at,
            price: this.price,
            card: this.card,
            seller: this.seller.id,
            sale: this.sale
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

    fromObject(order){
        this.id = order.id;
        this.title = order.title;
        this.description = order.description;
        this.quantity = order.quantity;
        this.status = order.status;
        this.created_at = order.created_at;
        this.price = order.price;
        this.card = new Card(
            order.card.id,
            order.card.card_id,
            order.card.name,
            order.card.description,
            order.card.image,
            order.card.artist,
            order.card.rarity,
            order.card.type
        )
        this.seller = new Profile(
            order.profile.id,
            order.profile.name,
            order.profile.surname,
            order.profile.admin,
            order.profile.seller,
        );
        this.sale = order.sale;
    }
}
