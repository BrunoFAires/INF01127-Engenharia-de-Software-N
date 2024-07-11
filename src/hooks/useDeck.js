import {useEffect, useState} from "react";
import {findByName} from "../service/pokemonClient";
import {Deck} from "../models/deck";
import {Card} from "../models/card";
import {insertDeck, updateDeck} from "../service/deckService";
import {useLocation, useNavigate} from "react-router-dom";

export const useDeck = ({currentUser}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState();
    const [apiResponse, setApiResponse] = useState();
    const [deck] = useState(new Deck(null, null, null, 0, currentUser, []));
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

    useEffect(() => {
        if (deckToEdit) {
            deck.fromObject(deckToEdit)
            console.log(deck)
        }
    }, [deckToEdit]);


    useEffect(() => {
        const validForm = deck.title
            && deck.description
            && deck.cards.length > 0
        setIsValidForm(validForm)
    }, [update]);


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
    }, [actualPage]);

    const handleAddCard = (selectedCard) => {
        const card = new Card(null, selectedCard.id, selectedCard.name, selectedCard.flavorText, selectedCard.images.large, selectedCard.artist, selectedCard.rarity, selectedCard.type, deck);
        deck.addCard(card);
        console.log(deck)
        setUpdate(!update);
    };

    const handleRemoveCard = (card, removeCard) => {
        const cardId = card.card_id ? card.card_id : card.id
        deck.removeCard(cardId)
        if(deck.id && removeCard){
            setCardsToRemove([...cardsToRemove, card.id])
        }
        setUpdate(!update);
    }

    const handleSubmit = () => {
        if (deck.id) {
            updateDeck(deck, cardsToRemove).then(navigate('/decks', {replace: true}))
        }else{
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

