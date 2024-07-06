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

    setTitle(title) {
        this.title = title
    }

    setDescription(description) {
        this.description = description
    }

    addCard(card) {
        this.cards.push(card)

        return this
    }

    removeCard(id) {
        const index = this.cards.findIndex(it => it.id === id);

        if (index !== -1) {
            this.cards.splice(index, 1);
        }
    }

    hasCard(id) {
        console.log('a')
        console.log(id)
        return this.cards.filter(it => it.id === id).length > 0
    }

    totalCard(id) {
        return this.cards.filter(it => it.id === id).length
    }

    groupedCardsById() {
        const seen = new Set();
        return this.cards.filter(item => {
            if (!seen.has(item.id)) {
                seen.add(item.id);
                return true;
            }
            return false;
        });
    }
}
