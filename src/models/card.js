export class Card {
    _id;
    _card_id;
    _name;
    _description;
    _image;
    _artist;
    _rarity;
    _type;

    constructor(id, card_id, name, description, image, artist, rarity, type) {
        this._id = id;
        this._card_id = card_id;
        this._name = name;
        this._description = description;
        this._image = image;
        this._artist = artist;
        this._rarity = rarity;
        this._type = type;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get card_id() {
        return this._card_id;
    }

    set card_id(value) {
        this._card_id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get artist() {
        return this._artist;
    }

    set artist(value) {
        this._artist = value;
    }

    get rarity() {
        return this._rarity;
    }

    set rarity(value) {
        this._rarity = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    toSupabaseInstance() {
        return {
            id: this._id,
            card_id: this._card_id,
            name: this._name,
            description: this._description,
            image: this._image,
            artist: this._artist,
            rarity: this._rarity,
            type: this._type
        };
    }
}
