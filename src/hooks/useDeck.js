import {useEffect, useState} from "react";
import {findByName} from "../service/pokemonClient";
import {Deck} from "../models/deck";
import {Card} from "../models/card";
import {insertDeck, updateDeck} from "../service/deckService";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthHook} from "./useAuthHook";

export const useDeck = ({user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState();
    const [apiResponse, setApiResponse] = useState();
    const [deck] = useState(new Deck(null, null, null, 0, user, []));
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [actualPage, setActualPage] = useState(1);
    const [update, setUpdate] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false)
    const [cardsToRemove, setCardsToRemove] = useState([])
    const pageItems = 10;
    const navigate = useNavigate()
    const {state} = useLocation();
    const deckToEdit = state?.deckToEdit
    const {currentUser} = useAuthHook()

    useEffect(() => {
        if (currentUser)
            deck.setUser(currentUser)
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (deckToEdit) {
            deck.fromObject(deckToEdit)
        }
    }, [deckToEdit]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        const validForm = deck.title
            && deck.description
            && deck.cards.length > 0
        setIsValidForm(validForm)
    }, [update]); // eslint-disable-line react-hooks/exhaustive-deps


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSearchCardTitle(null);
        setTotalPages(null);
        setApiResponse(null);
        setActualPage(1)
    };

    const handleChangeTitle = (data) => {
        deck.setTitle(data.target.value);
        setUpdate(!update);
    };

    const handleChangeDescription = (data) => {
        deck.setDescription(data.target.value);
        setUpdate(!update);
    };

    const searchCard = async () => {
        if (!searchCardTitle) return;
        setLoading(true);
        const result = await findByName(searchCardTitle, actualPage);
        setApiResponse(result);
        const total = Math.ceil(result?.totalCount / pageItems);
        setTotalPages(total);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        searchCard().then().finally(() => {
            setLoading(false);
        });
    }, [actualPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddCard = (selectedCard) => {
        const card = new Card(null, selectedCard.id, selectedCard.name, selectedCard.flavorText, selectedCard.images.large, selectedCard.artist, selectedCard.rarity, selectedCard.type, deck);
        deck.addCard(card);
        setUpdate(!update);
    };

    const handleRemoveCard = (card, removeCard) => {
        const cardId = card.card_id ? card.card_id : card.id
        deck.removeCard(cardId)
        if (deck.id && removeCard) {
            setCardsToRemove([...cardsToRemove, card.id])
        }
        setUpdate(!update);
    }

    const handleSubmit = () => {
        if (deck.id) {
            updateDeck(deck, cardsToRemove).then(navigate('/decks', {replace: true}))
        } else {
            insertDeck(deck).then(navigate('/decks', {replace: true}))
        }
    };


    return {
        handleChangeTitle,
        searchCardTitle,
        handleChangeDescription,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard,
        apiResponse,
        loading,
        totalPages,
        setActualPage,
        actualPage,
        handleAddCard,
        handleRemoveCard,
        handleSubmit,
        deck: deck,
        isValidForm
    };
};

