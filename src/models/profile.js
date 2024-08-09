export class Profile {
    constructor(id, name, surname, admin, seller) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.admin = admin;
        this.seller = seller;
    }

    setName(name){
        this.name = name
    }

    setSurname(name){
        this.surname = name
    }

    getName(){
        return this.name
    }

    getSurnameName(){
        return this.name
    }

    setSeller(seller){
        this.seller = seller
    }

    getSeller(){
        return this.seller
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
            seller: this.seller
        }
    }
}
