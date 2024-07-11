import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as deckService from "../service/deckService";
import {myDecks} from "../service/deckService";
import {Deck} from "../models/deck";
import {getCurrentUser} from "../service/authService";

export const useMyDecks = ({currentUser}) => {
    const [decks, setDecks] = useState([])
    const [user, setUser] = useState(currentUser)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deckToDelete, setDeckToDelete] = useState()
    const [loading, setLoading] = useState(true)

    const handleOnEdit = (deck) => {
        navigate('/deck', {state: {deckToEdit: deck}})
    }

    useEffect(() => {
        if(!user){
            console.log(getCurrentUser())
            setUser(getCurrentUser())
        }
    }, [user]);

    const handleDeleteDeck = (deck) => {
        setShowDeleteModal(true)
        setDeckToDelete(deck)
    }

    const handleConfirmeDelete = () => {
        deckService.deleteDeck(deckToDelete)
        const newDecks = decks.filter(it => it.id !== deckToDelete.id)
        setDecks(newDecks)
        setShowDeleteModal(false)
        setDeckToDelete(null)
    }
    const handleCancel = () => {
        setDeckToDelete(null)
        setShowDeleteModal(false)
    }

    useEffect(() => {
        const decks = []
        myDecks(currentUser).then(it => {
            it.data.forEach(deckResult => {
                const deck = new Deck(deckResult.id, deckResult.title, deckResult.description, deckResult.rating, currentUser, deckResult.card)
                decks.push(deck)
            })

            setDecks(decks)
            setLoading(false)
        })
    }, []);


    return {
        navigate,
        decks,
        handleDeleteDeck,
        showDeleteModal,
        handleConfirmeDelete,
        handleCancel,
        loading,
        handleOnEdit
    }
}