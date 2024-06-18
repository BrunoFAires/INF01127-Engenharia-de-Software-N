import {Profile} from "./profile";

export class User {
    constructor(id, email, password, name, surname, admin, seller) {
        this.id = id;
        this.email = email;
        this.password = password;
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
