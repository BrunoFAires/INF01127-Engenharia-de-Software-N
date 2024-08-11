import { Card } from "./card";
import { Profile } from "./profile";

export class Advertisement {
    constructor(id, title, description, quantity, status, created_at, price, card, seller, sale) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.quantity = quantity;
        this.status = status;
        this.created_at = created_at;
        this.price = price;
        this.card = card;
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
            created_at: this.created_at,
            price: this.price,
            card: this.card,
            seller: this.seller,
            sale: this.sale
        };
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