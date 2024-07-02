export class Deck {
    constructor(title, description, user) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.rating = 0
        this.cards = []
    }


    cardsLenght() {
        return this.cards.length
    }

    toSupabaseInstance() {
        return {
            title: this.title,
            description: this.description,
            rating: this.rating,
            user_id: this.user.id
        }
    }

    addCard(card){
        this.cards.push(card)
    }

    removeCard(card){
        this.cards = this.cards.filter(it => it.id !== card.id)
    }
}