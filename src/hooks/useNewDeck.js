import { useEffect, useState } from "react";
import { findByName } from "../service/pokemonClient";
import { Deck } from "../models/deck";
import { Card } from "../models/card";

export const useNewDeck = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState();
    const [apiResponse, setApiResponse] = useState();
    const [deck] = useState(new Deck());
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [actualPage, setActualPage] = useState(1);
    const [update, setUpdate] = useState(false);
    const pageItems = 10;

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
        const card = new Card(selectedCard.id, selectedCard.name, selectedCard.flavorText, selectedCard.images.large, deck);
        deck.addCard(card);
        setUpdate(!update);
    };

    const handleRemoveCard = (id) => {
        deck.removeCard(id)
        setUpdate(!update);
    }

    const handleSubmit = () => {
        console.log(deck);
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
        deck,
    };
};

