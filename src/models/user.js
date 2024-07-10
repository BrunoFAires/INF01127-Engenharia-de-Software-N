import {Profile} from "./profile";

export class User {
    constructor(id, email, name, surname, admin, seller) {
        this.id = id;
        this.email = email;
        this.profile = new Profile(id, name, surname, admin, seller)
    }


    toSupabaseInstance() {
        return {
            email: this.email,
            password: this.password,
            options: {
                data: this.profile.toSupabaseInstance()
            }
        }
    }
}
