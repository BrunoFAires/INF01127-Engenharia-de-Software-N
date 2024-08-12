import { Advertisements } from "./advertisements";
import { Profile } from "./profile";

export class Order_User {
    #id;
    #order_id;
    #profile;
    #advertisement;
    #finished;
    #quantity;
    #evaluated;
    #approved;

    constructor(id, order_id, user, advertisement, finished, quantity, evaluated, approved) {
        this.#id = id;
        this.#order_id = order_id;
        this.#profile = new Profile(user?.id, user?.name, user?.surname, user?.admin, user?.seller, user?.evaluations, user?.ratings);
        this.#advertisement = new Advertisements(advertisement?.id, advertisement?.title, advertisement?.description, advertisement?.quantity, advertisement?.status, advertisement?.created_at, advertisement?.price, advertisement?.card, advertisement?.profile, advertisement?.sale);
        this.#finished = finished;
        this.#quantity = quantity;
        this.#evaluated = evaluated;
        this.#approved = approved;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get order_id() {
        return this.#order_id;
    }

    set order_id(value) {
        this.#order_id = value;
    }

    get profile() {
        return this.#profile;
    }

    set profile(value) {
        this.#profile = new Profile(value?.id, value?.name, value?.surname, value?.admin, value?.seller, value?.evaluations, value?.ratings);
    }

    get advertisement() {
        return this.#advertisement;
    }

    set advertisement(value) {
        this.#advertisement = new Advertisements(value?.id, value?.title, value?.description, value?.quantity, value?.status, value?.created_at, value?.price, value?.card, value?.profile, value?.sale);
    }

    get finished() {
        return this.#finished;
    }

    set finished(value) {
        this.#finished = value;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        this.#quantity = value;
    }

    get evaluated() {
        return this.#evaluated;
    }

    set evaluated(value) {
        this.#evaluated = value;
    }

    get approved() {
        return this.#approved;
    }

    set approved(value) {
        this.#approved = value;
    }

    deliveredOrder() {
        this.#finished = true;
    }

    evaluatedOrder() {
        this.#evaluated = true;
    }
}
