import { Profile } from "./profile";

export class User {
    #id;
    #email;
    #profile;

    constructor(id, email, name, surname, admin, seller) {
        this.#id = id;
        this.#email = email;
        this.#profile = new Profile(id, name, surname, admin, seller);
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get profile() {
        return this.#profile;
    }

    set profile(value) {
        this.#profile = new Profile(value.id, value.name, value.surname, value.admin, value.seller);
    }

    toSupabaseInstance() {
        return {
            email: this.#email,
            options: {
                data: this.#profile.toSupabaseInstance()
            }
        };
    }
}
