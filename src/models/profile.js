export class Profile {
    constructor(id, name, surname, admin, seller, evaluations, ratings ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.admin = admin;
        this.seller = seller;
        this.evaluations = evaluations;
        this.ratings = ratings;
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
