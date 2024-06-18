export class Profile {
    constructor(id, name, surname, admin, seller) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.admin = admin;
        this.seller = seller;
    }

    get isAdmin() {
        return this.admin
    }

    get isSeller() {
        return this.seller
    }


    toSupabaseInstance() {
        return {
            name: this.name,
            surname: this.surname,
            admin: this.admin,
            seller: this.seller
        }
    }
}
