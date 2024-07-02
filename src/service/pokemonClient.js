import pokemon from 'pokemontcgsdk'

pokemon.configure({apiKey: 'e310972e-d82e-43fb-99bf-76c5d011be89'})

export const findByName = async (name) => {
    const cards = await pokemon.card.where({ q: `name:${name}` , pageSize:10 })


    return cards
}