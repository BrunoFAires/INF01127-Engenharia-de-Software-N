export class Profile {
    #id;
    #name;
    #surname;
    #admin;
    #seller;
    #evaluations;
    #ratings;

    constructor(id, name, surname, admin, seller, evaluations, ratings) {
        this.#id = id;
        this.#name = name;
        this.#surname = surname;
        this.#admin = admin;
        this.#seller = seller;
        this.#evaluations = evaluations;
        this.#ratings = ratings;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get surname() {
        return this.#surname;
    }

    set surname(value) {
        this.#surname = value;
    }

    get admin() {
        return this.#admin;
    }

    set admin(value) {
        this.#admin = value;
    }

    get seller() {
        return this.#seller;
    }

    set seller(value) {
        this.#seller = value;
    }

    get evaluations() {
        return this.#evaluations;
    }

    set evaluations(value) {
        this.#evaluations = value;
    }

    get ratings() {
        return this.#ratings;
    }

    set ratings(value) {
        this.#ratings = value;
    }

    get isAdmin() {
        return this.#admin;
    }

    get isSeller() {
        return this.#seller;
    }

    toSupabaseInstance() {
        return {
            name: this.#name,
            surname: this.#surname,
            seller: this.#seller
        };
    }
}
