import { Order_User } from "./order_user";

export class Order {
    #id;
    #deal;
    #created_at;
    #finished_at;
    #approved;
    #order_user;

    constructor(id, deal, created_at, finished_at, approved, order_user) {
        this.#id = id;
        this.#deal = deal;
        this.#created_at = created_at;
        this.#finished_at = finished_at;
        this.#approved = approved;
        this.#order_user = order_user.map(it => new Order_User(it.id, it.order_id, it.profile, it.advertisements, it.finished, it.quantity, it.evaluated, it.approved));
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get deal() {
        return this.#deal;
    }

    set deal(value) {
        this.#deal = value;
    }

    get created_at() {
        return this.#created_at;
    }

    set created_at(value) {
        this.#created_at = value;
    }

    get finished_at() {
        return this.#finished_at;
    }

    set finished_at(value) {
        this.#finished_at = value;
    }

    get approved() {
        return this.#approved;
    }

    set approved(value) {
        this.#approved = value;
    }

    get order_user() {
        return this.#order_user;
    }

    set order_user(value) {
        this.#order_user = value.map(it => new Order_User(it.id, it.order_id, it.profile, it.advertisements, it.finished, it.quantity, it.evaluated, it.approved));
    }

    deliveredOrder() {
        if (this.#order_user.length > 0) {
            this.#order_user[0].finished = true;
        }
    }

    evaluatedOrder() {
        if (this.#order_user.length > 0) {
            this.#order_user[0].evaluated = true;
        }
    }
}
