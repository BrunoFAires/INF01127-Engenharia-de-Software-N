export class Post {
    constructor(id, text, imagePath, likes, dislikes, comments, liked, disliked, user) {
        this.id = id;
        this.text = text;
        this.imagePath = imagePath;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
        this.user = user
        this.liked = liked
        this.disliked = disliked
    }

    setText = (text) => {
        this.text = text
    }

    likePost() {
        if (this.liked) {
            this.liked = false
            this.likes--
        } else {
            this.liked = true
            this.likes++

            if (this.disliked) {
                this.dislikes = false;
                this.disliked--;
            }
        }
    }

    dislikePost() {
        if (this.dislikes) {
            this.disliked = false
            this.dislikes--
        } else {
            this.disliked = true
            this.dislikes++

            if (this.liked) {
                this.liked = false;
                this.likes--;
            }
        }
    }

    addComment(){
        this.comments++
    }

    removeComment(){
        this.comments--
    }

    //TODO Sistematica para compartilhar um baralho(criar uma tabela chamada card_post que relaciona as cartas de um baralho a uma publicação)
    //  Sistematica para realizar comentários nas publicações.(nova rota, com um novo campo e carregando os comentários da publicação)

    setUser = (user) => {
        this.user = user
    }

    toSupabaseInstance() {
        return {
            text: this?.text,
            image_path: this?.imagePath,
            user_id: this.user.id,
        }
    }

}
